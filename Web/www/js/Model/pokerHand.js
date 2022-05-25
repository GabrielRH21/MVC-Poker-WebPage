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

import { Hand } from "./hand.js";

/**
 * @description This class manage the value of the plays of the poker hands
 * @class
 */
export class PokerHand {

  /**
   * @property {Hand} hand Hand with cards
   * @private
   */
  #hand;

  /**
   * @property {String} type Name of the value of you hand
   * @private
   */
  #type;

  /**
   * @property {Number} handValue Value of your play
   * @private
   */
  #handValue = 0;

  /**
   * @property {String} suit best suit on you play
   * @private
   */
  #suit;

  /**
   * @property {String} card Best value of card of your play
   */
  #card;

  /**
   * @description Constructor of the class, atributtes are instanced here
   * @param {Hand} hand Hand with  cards
   */
  constructor(hand) {
    this.#hand =  hand;
  }

  /**
   * @description This method return if the hand has pair
   * @private
   * @return {Boolean}
   */
  #hasPair() {
    for (let i = 0; i < this.#hand.getLength(); ++i) {
      for (let j = 0; j < this.#hand.getLength(); ++j) {
        if (j !== i) {
          if (this.#hand.getCard(i).getRank() === this.#hand.getCard(j).getRank()) {
            this.#card = this.#hand.getCard(i).getRank();
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * @description This method return the Name of the value of you hand
   * @public
   * @return {String} Name of the value of you hand
   */
  getType() {
    return this.#type;
  }

  /**
   * @description This method return the value of you hand
   * @public
   * @return {String} The value of you hand
   */
  getValue() {
    return this.#handValue;
  }

  /**
   * @description This method return the best suit on you play
   * @public
   * @return {String} The best suit on you play
   */
  getSuit() {
    return this.#suit;
  }

  /**
   * @description This method return the Best value of card of your play
   * @public
   * @return {String} Best value of card of your play
   */
  getCard () {
    return this.#card;
  }

  /**
   * @description This method return if the hand has two pair
   * @private
   * @return {Boolean}
   */
  #hasTwoPair() {
    let  first = 1;
    let second = 1;
    let firstRank;
    let secondRank;
    for (let i = 0; i < this.#hand.getLength(); ++i) {
      for (let j = 0; j < this.#hand.getLength(); ++j) {
        if ( this.#hand.getCard(i).getRank() !== this.#hand.getCard(j).getRank()) {
          for (let k = 0; k < this.#hand.getLength(); ++k) {
            if (i !== k && this.#hand.getCard(i).getRank() === this.#hand.getCard(k).getRank() ) {
              first += 1;
              firstRank = this.#hand.getCard(i).getRank();
            }
            if (j !== k && this.#hand.getCard(j).getRank() === this.#hand.getCard(k).getRank()) {
              secondRank = this.#hand.getCard(j).getRank()
              second += 1;
            }
          }
          if (first > 1 && second > 1) {
            if (this.convert(firstRank) < this.convert(secondRank)) {
              this.#card = secondRank;
            } else {
              this.#card = firstRank;
            }
            return true;
          }
          first = 1;
          second = 1;
        }
      }
    }
    return false;
  }

  /**
   * @description This method return if the hand has three of a kind
   * @private
   * @return {Boolean}
   */
  #hasThreeOfaKind() {
    let count = 1;
    let cardVal;
    for (let i = 0; i < this.#hand.getLength(); ++i) {
      for (let j = 0; j < this.#hand.getLength(); ++j) {
        if (j !== i) {
          if (this.#hand.getCard(i).getRank() === this.#hand.getCard(j).getRank()) {
            count += 1;
            cardVal = this.#hand.getCard(i).getRank();
          }
        }
      }
      if (count > 2) {
        this.#card = cardVal;
        return true;
      }
      count = 1;
    }
    return false;
  }

  /**
   * @description This method return if the hand has straight
   * @private
   * @return {Boolean}
   */
  #hasStraight() {
    let numberValues  = this.#getValues();
    numberValues.sort(function(a, b) { return a - b; });
    if (15 - numberValues.length <  numberValues[0]) {
      return false;
    }
    if (numberValues[0] === 1 && numberValues[numberValues.length - 1] === 13) {
      numberValues[0] = 9;
    }
    let lastValue = numberValues[0];
    for (let i = 1; i < numberValues.length; ++i) {
      if (lastValue + 1 === numberValues[i]) {
        lastValue = numberValues[i]; 
      }  else  {
        
        return false;
      }
    }
    this.#card = this.#hand.getBigger;
    return true;
  }

  /**
   * @description This method return if the hand has flush
   * @private
   * @return {Boolean}
   */
  #hasFlush() {
    let suit = this.#hand.getCard(0).getSuit();
    for (let i = 1; i < this.#hand.getLength(); ++i) {
      if (this.#hand.getCard(i).getSuit() !== suit) {
        return false;
      }
    }
    this.#suit = suit;
    return true;
  }

  /**
   * @description This method return if the hand has full house
   * @private
   * @return {Boolean}
   */
  #hasFullHouse()  {
    let pos;
    let firstCard = this.#hand.getCard(0).getRank();
    for (let i = 1; i < this.#hand.getLength(); ++i) {
      if (firstCard !== this.#hand.getCard(i).getRank()) {
        pos = i;
      }
    }
    let secondCard = this.#hand.getCard(pos).getRank();
    let first  = 0;
    let second = 0;
    for (let i = 0; i < this.#hand.getLength(); ++i) {
      if (firstCard === this.#hand.getCard(i).getRank()) {
        first++;
      }
      if (secondCard === this.#hand.getCard(i).getRank()) {
        second++;
      }
    }
    if (first + second === 5) {
      if (first === 2 || second === 2) {
        if (this.convert(firstCard) < this.convert(secondCard)) {
          this.#card = secondCard;
        } else {
          this.#card = firstCard;
        }
        return true;
      }
    }
    return false;
  }
  
  convert(card) {
    let value;
    switch (card) {
      case 'A':
        value = 1;
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
        value = Number(card);
        break;
    }
    return value;
  }

  /**
   * @description This method return if the hand has four of a kind
   * @private
   * @return {Boolean}
   */
  #hasFouraKind() {
    let count = 1;
    let cardVal;
    for (let i = 0; i < this.#hand.getLength(); ++i) {
      for (let j = 0; j < this.#hand.getLength(); ++j) {
        if (j !== i) {
          if (this.#hand.getCard(i).getRank() === this.#hand.getCard(j).getRank()) {
            cardVal = this.#hand.getCard(i).getRank();
            count += 1;
          }
        }
      }
      if (count > 3) {
        this.#card = cardVal;
        return true;
      }
      count = 1;
    }
    return false;
  }

  /**
   * @description This method return if the hand has straight flush
   * @private
   * @return {Boolean}
   */
  #hasStraightFlush() {
    if (this.#hasStraight()) {
      return this.#hasFlush();
    }
    return false;
  }

  /**
   * @description This method converts the ranks into values
   * @private
   * @returns {Array} values of the ranks
   */
  #getValues() {
    let value;
    let handValues  = [];
    for (let i = 0; i < this.#hand.getLength(); ++i) {
      switch (this.#hand.getCard(i).getRank()) {
        case 'A':
          value = 1;
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
          value = Number(this.#hand.getCard(i).getRank());
          break;
      }
      handValues.push(value);
    }
    return handValues;
  }

  /**
   * @description This method classifies the pokerHand depending on the play;
   * @public
   */
  classify() {
    this.#card = this.#hand.getBigger();
    if (this.#hasPair()) {
      this.#type = 'Pair';
      this.#handValue = 1;
    }
    if (this.#hasTwoPair()) {
      this.#type = 'Two Pair';
      this.#handValue = 2;
    }
    if (this.#hasThreeOfaKind()) {
      this.#type = 'Three of a kind';
      this.#handValue = 3;
    }
    if (this.#hasStraight()) {
      this.#type = 'Straight';
      this.#handValue = 4;
    }
    if (this.#hasFlush()) {
      this.#type = 'Flush';
      this.#handValue = 5;
    }
    if (this.#hasFullHouse()) {
      this.#type = 'Full house';
      this.#handValue = 6;
    }
    if (this.#hasFouraKind()) {
      this.#type = 'Four of a kind';
      this.#handValue = 7;
    }
    if (this.#hasStraightFlush()) {
      this.#type = 'Straight flush';
      this.#handValue = 8;
    }
    console.log(this.#type);
  }

  /**
   * @description This method compare two pokerhands and 
   * return true if the local one is better 
   * @param {PokerHand} pokerhand hand to compare
   * @returns {Boolean}
   */
  win(pokerhand) {
    if (this.#handValue !== pokerhand.getValue()) {
      if (this.#handValue > pokerhand.getValue()) {
        return true;
      }  else {
        return false;
      }
    }
    if (this.#handValue < 4 || this.#handValue === 6 || this.#handValue === 7) {
      return this.#card > pokerhand.getCard();
    }
    return this.#suitVal(this.#suit) > this.#suitVal(pokerhand.getSuit);
  }

  /**
   * @description This method give a value to a suit
   * @private
   * @param {String} toCompare Suit to know his value
   * @returns {Number} The value
   */
  #suitVal(toCompare) {
    switch (toCompare) {
      case 'Spades':
        return  4
      break;
      case 'Diamonds':
        return 2;
      break;
      case 'Hearts':
        return 3;
      break;
      case 'Clubs':
        return 1
      break;
      default:
      break;
    }
  }

}


