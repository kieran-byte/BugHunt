
import React from 'react'
import { IonCol, IonGrid, IonRow } from '@ionic/react';
import styles from './Footer.module.css'

/**
 * Given Props containing the accrededations of all items, create a <IonRow> <p> containing all of them 
 * @returns 
 * 
 */
const Footer = ({links}) => {

  return (
    <IonGrid >
      <IonRow className={styles.header} >
        <p > This section is for accreditation of all used content</p>
      </IonRow>
      
      <IonCol>
      {links.map((link:string, index) => (
        <IonRow className={styles.centeredRows}>
          <p key={index}>
          <a href={link}>{link}</a>
        </p>
        </IonRow>
        
      ))}
    </IonCol>


    </IonGrid>
  );
};

export default Footer;
