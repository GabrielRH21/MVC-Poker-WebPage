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

export class Cards {
  #suit;
  #rank;
  #image;

  constructor(newSuit, newRank) {
    this.#suit = newSuit;
    this.#rank = newRank;
    let imageName = `${this.#rank}${this.#suit[0]}.png`;
    this.#image = `/js/Model/img/${imageName}`

  }

  toString() {
    return  `${this.#rank} of ${this.#suit}`;
  }

  getSuit() {
    return this.#suit;
  }

  getRank() {
    return this.#rank;
  }

  getImage() {
    return this.#image;
  }

  biggerSuitThan(toCompare) {
    switch (toCompare.getSuit()) {
      case 'Spades':
        if (this.#suit === 'Spades') {
          return this.biggerRankThan(toCompare);
        }
        return false;
      break;
      case 'Diamonds':
        if (this.#suit === 'Clubs') {
          return false;
        }
        if (this.#suit === 'Diamonds') {
          return this.biggerRankThan(toCompare);
        }
        return true;
      break;
      case 'Hearts':
        if (this.#suit === 'Spades') {
          return true;
        }
        if (this.#suit === 'Hearts') {
          return this.biggerRankThan(toCompare);
        }
        return false;
      break;
      case 'Clubs':
        if (this.#suit === 'Clubs') {
          return this.biggerRankThan(toCompare);
        }
        return true;
      break;
      default:
      break;
    }
  }


  biggerRankThan(toCompare) {
    let compareRank = toCompare.getRank();
    switch (compareRank) {
      case 'A':
        compareRank = 14;
      break;
      case 'J':
        compareRank = 11;
      break;
      case 'Q':
        compareRank = 12;
      break;
      case 'K':
        compareRank = 13;
      break;
      default:
        compareRank = Number(toCompare.getRank());
      break;
    }
    let myRank  = rankToNumber();
    return myRank > compareRank;
  }
  

  rankToNumber() {
    switch (this.#rank) {
      case 'A':
        return 14;
      break;
      case 'J':
        return 11;
      break;
      case 'Q':
        return 12;
      break;
      case 'K':
        return 13;
      break;
      default:
        return Number(this.#rank);
      break;
    }
  }
}



