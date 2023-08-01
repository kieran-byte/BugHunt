import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  WebSocketServer,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GamesService } from '../games/games.service';

interface UserSocket extends Socket {
  userId: string;
}

@WebSocketGateway({ cors: true })
export class GamesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private waitingList: UserSocket[] = [];

  constructor(private gamesService: GamesService) {}

  afterInit(server: Server) {
    console.log('Initialized!');
  }

  handleConnection(client: UserSocket, ...args: any[]) {
    client.emit('connected', 'You are connected!');
  }

  handleDisconnect(client: UserSocket) {
    // Remove user from waiting list if they disconnect.
    const index = this.waitingList.findIndex(
      (socket) => socket.id === client.id,
    );
    if (index > -1) {
      this.waitingList.splice(index, 1);
    }
  }

  @SubscribeMessage('userConnected')
  handleUserConnected(client: UserSocket, payload: { userId: string }) {
    client.userId = payload.userId;
  }

  @SubscribeMessage('waiting')
  async handleWaiting(client: UserSocket) {
    this.waitingList.push(client);
    if (this.waitingList.length >= 2) {
      const player1Socket = this.waitingList.shift();
      const player2Socket = this.waitingList.shift();
      const game = await this.gamesService.create({
        player1Id: player1Socket.userId,
        player2Id: player2Socket.userId,
      });
      player1Socket.join(game._id.toString());
      player2Socket.join(game._id.toString());
      this.server.to(game._id.toString()).emit('start', { game });
    }
  }

  @SubscribeMessage('answer')
  async handleAnswer(
    client: UserSocket,
    payload: { gameId: string; isCorrect: boolean },
  ) {
    const game = await this.gamesService.findOne(payload.gameId);
    if (!game) {
      console.error('Game not found');
      return;
    }

    let scoringUserId: string | null = null;

    if (payload.isCorrect) {
      scoringUserId = client.userId;
      await this.gamesService.updateScore(
        game._id.toString(),
        scoringUserId,
        1,
      );
    } else {
      scoringUserId =
        game.player1._id.toString() === client.userId
          ? game.player2._id.toString()
          : game.player1._id.toString();
      await this.gamesService.updateScore(
        game._id.toString(),
        scoringUserId,
        1,
      );
    }

    const answerId = client.userId;

    const updatedGame = await this.gamesService.findOne(game._id.toString());
    if (updatedGame.player1Score === 2 || updatedGame.player2Score === 2) {
      const winnerId =
        updatedGame.player1Score === 2
          ? updatedGame.player1._id.toString()
          : updatedGame.player2._id.toString();
      const loserId =
        updatedGame.player1Score === 2
          ? updatedGame.player2._id.toString()
          : updatedGame.player1._id.toString();

      await this.gamesService.updateElo(winnerId, 10);
      await this.gamesService.updateElo(loserId, 10);

      this.server.to(updatedGame._id.toString()).emit('gameOver', updatedGame);
    } else {
      // Include scoringUserId and isCorrect in the nextQuestion event
      this.server.to(updatedGame._id.toString()).emit('nextQuestion', {
        updatedGame,
        scoringUserId: answerId,
        isCorrect: payload.isCorrect,
      });
    }
  }
}
