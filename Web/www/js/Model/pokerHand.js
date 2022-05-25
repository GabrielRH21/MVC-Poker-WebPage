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

export class PokerHand {
  #hand;
  #type;
  #handValue = 0;
  #suit;
  #card;

  constructor(hand) {
    this.#hand =  hand;
  }

  hasPair() {
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

  getType() {
    return this.#type;
  }

  getValue() {
    return this.#handValue;
  }

  getSuit() {
    return this.#suit;
  }

  getCard () {
    return this.#card;
  }

  hasTwoPair() {
    let  first = 1;
    let second = 1;
    let firstRank;
    let secondRank;
    for (let i = 0; i < this.#hand.getLength(); ++i) {
      for (let j = 0; j < this.#hand.getLength(); ++j) {
        if ( this.#hand.getCard(i).getRank() === this.#hand.getCard(j).getRank()) {
          for (let k = 0; k < this.#hand.getLength(); ++k) {
            if (i !== k && this.#hand.getCard(i).getRank() === this.#hand.getCard(k).getRank()) {
              first += 1;
              firstRank = this.#hand.getCard(i).getRank();
            }
            if (j !== k && this.#hand.getCard(j).getRank() === this.#hand.getCard(k).getRank()) {
              secondRank = this.#hand.getCard(i).getRank()
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

  hasThreeOfaKind() {
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


  hasStraight() {
    let numberValues  = this.getValues();
    numberValues.sort(function(a, b) { return a - b; });
    if (15 - numberValues.length <  numberValues[0]) {
      return false;
    }
    if (numberValues[numberValues.length - 1] === 1) {
      numberValues.pop();
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

  hasFlush() {
    let suit = this.#hand.getCard(0).getSuit();
    for (let i = 1; i < this.#hand.getLength(); ++i) {
      if (this.#hand.getCard(i).getSuit() !== suit) {
        return false;
      }
    }
    this.#suit = suit;
    return true;
  }

  hasFullHouse()  {
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
    for (let i = 1; i < this.#hand.getLength(); ++i) {
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

  hasFouraKind() {
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

  hasStraightFlush() {
    if (this.hasStraight()) {
      return this.hasFlush();
    }
    return false;
  }

  getValues() {
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

  classify() {
    this.#card = this.#hand.getBigger();
    if (this.hasPair()) {
      this.#type = 'Pair';
      this.#handValue = 1;
    }
    if (this.hasTwoPair()) {
      this.#type = 'Two Pair';
      this.#handValue = 2;
    }
    if (this.hasThreeOfaKind()) {
      this.#type = 'Three of a kind';
      this.#handValue = 3;
    }
    if (this.hasStraight()) {
      this.#type = 'Three of a kind';
      this.#handValue = 4;
    }
    if (this.hasFlush()) {
      this.#type = 'Flush';
      this.#handValue = 5;
    }
    if (this.hasFullHouse()) {
      this.#type = 'Full house';
      this.#handValue = 6;
    }
    if (this.hasFouraKind()) {
      this.#type = 'Four of a kind';
      this.#handValue = 7;
    }
    if (this.hasStraightFlush()) {
      this.#type = 'Straight flush';
      this.#handValue = 8;
    }
  }

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
    return this.suitVal(this.#suit) > this.suitVal(pokerhand.getSuit);
  }

  suitVal(toCompare) {
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


