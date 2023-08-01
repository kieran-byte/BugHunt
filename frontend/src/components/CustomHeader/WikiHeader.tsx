import React from 'react'
import Button from '../Button.tsx'
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonCol,
    IonRow,
    IonApp
  } from '@ionic/react';
import styles from './Wikiheader.module.css'


const WikiHeader = () => {
    return (

        <IonHeader>
          <IonToolbar>
            <IonRow>
              <Button className={styles.homeButton} onClick={()=> alert('Daily puzzle button is clicked')}> Menu </Button>
              <IonTitle className={styles.title}>Wiki</IonTitle>
            </IonRow>
          </IonToolbar>
        </IonHeader> 

    );
  };
  
  export default WikiHeader;