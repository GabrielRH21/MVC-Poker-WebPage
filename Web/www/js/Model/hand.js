/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Gabriel Rodríguez Hernández
 * @since may 2 2022
 * @desc mandelBrot.js
 *       This file contains the Dates class, this class is responsible for managing 
 *       dates and calculating the day following the current one.
 * @see {@link https://app.codecov.io/gh}
 * @see {@link https://docs.google.com/presentation/d/1wrqfNeeNbbEwbAD1bAMqA4CfL2jINrtJ4YWzStd5MjM/edit#slide=id.g814cc5b720_1_0}
 * @see {@link https://github.com/ULL-ESIT-PAI-2021-2022/2021-2022-pai-p08-oop-alu0101216829}
 *
**/

'use strict';

import { Cards } from "./card.js";

export  class Hand {
  #hand = [];

  constructor() {

  }

  /**
  * @description This method Remove a card from the hand and return it.
  * @public
  * @return {Cards} Card randomly selected
  */
    popCard() {
    const pos = Math.floor(Math.random() * this.#hand.length);
    const result = this.#hand[pos];
    this.#hand.splice(pos, 1);
    return result;
    /*
      En caso de coger la ultima carta en vez de una  aleatoria

      const pos = this.#hand.length -  1;
      const result = this.#hand[pos];
      let aux = this.#hand.splice(pos, 1);
      this.#hand = aux;
      return result;
    */
  }

  getBigger() {
    let values = this.getValues()
    let max = values[0];
    for (let i = 1; i < this.#hand.length; ++i) {
      if (max < values[i]) {
        max = values[i];
      }
    }
    return max;
  }

  getValues() {
    let value;
    let handValues  = [];
    for (let i = 0; i < this.#hand.length; ++i) {
      switch (this.#hand[i].getRank()) {
        case 'A':
          value = 14;
          break;
        case 'J':
          value = 11;
          break;
        case  'Q':
          value = 12;
          break;
        case 'K':
          value = 13;
          break;
        default:
          value = Number(this.#hand[i].getRank());
          break;
      }
      handValues.push(value);
    }
    return handValues;
  }

  /**
   * @description This method Add a given card to the hand.
   * @public
   * @param {Cards} cardToAdd This card is going to be added
   */
  addCard(cardToAdd) {
    if (!this.#existInHand(cardToAdd)) {
      this.#hand.push(cardToAdd);
    }
  }

  /**
   * @description This method return the card tha id in the position specified
   * @public
   * @param {Number} pos position of the card
   * @return {Card} Card that is in the position specified
   */
  getCard(pos) {
    return this.#hand[pos];
  }

  /**
   * @description This method return the size of the hand
   * @public
   * @returns {Number} The size of the hand
   */
  getLength(){
    return  this.#hand.length;
  }

  /**
  * @description This method checks if the yea parameter is in the hand
  * @private
  * @param {Cards} card Card to compare
  * @return if the card is in the hand or not
  */
  #existInHand(card) {
    for (let i = 0; i < this.#hand.length; ++i) {
      if (this.#hand[i].getSuit() === card.getSuit() && this.#hand[i].getRank() === card.getRank()) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description This method exchanges the specified 
   * cards between a hand and the local hand
   * @public
   * @param {Hand} hand hand with which to change
   * @param {Number} numberOfCards number of cards to change
   * @return {Hand} hand with the changes made
   */
  moveCards(hand, numberOfCards) {
    let handCard;
    let localCard;
    for (let i = 0; i < numberOfCards; i++) {
      handCard = this.popCard();
      localCard = hand.popCard();
      hand.addCard(handCard);
      this.addCard(localCard);
    }
    return hand
  }
}