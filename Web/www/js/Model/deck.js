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
import { Hand } from "./hand.js";

export class Deck {

  /**
   * @property {Array} deck Deck of french cards
   */
  #deck = [];

  /**
   * @description Constructor of the class, attributes are instaced here
   */
  constructor() {
    let card;
    const suits = ['Clubs', 'Hearts', 'Diamonds', 'Spades'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (let suit = 0; suit < suits.length; ++suit) {
      for (let rank = 0; rank < ranks.length; ++rank) {
        card = new Cards(suits[suit], ranks[rank]);
        this.#deck.push(card);
      }
    }
  }

  /**
   * @description This method Remove a card from the deck and return it.
   * @public
   * @return {Cards} Card randomly selected
   */
  popCard() {
    const pos = Math.floor(Math.random() * this.#deck.length);
    const result = this.#deck[pos];
    this.#deck.splice(pos, 1);
    return result;
    /*
      En caso de coger la ultima carta en vez de una  aleatoria

      const pos = this.#deck.length -  1;
      const result = this.#deck[pos];
      let aux = this.#deck.splice(pos, 1);
      this.#deck = aux;
      return result;
    */
  }

  /**
   * @description This method Add a given card to the deck.
   * @public
   * @param {Cards} cardToAdd This card is going to be added
   */
  addCard(cardToAdd) {
    if (!this.#existInDeck(cardToAdd)) {
      this.#deck.push(cardToAdd);
    }
  }

  /**
   * @description This method checks if the yea parameter is in the deck
   * @private
   * @param {Cards} card Card to compare
   * @return if the card is in the deck or not
   */
  #existInDeck(card) {
    for (let i = 0; i < this.#deck.length; ++i) {
      if (this.#deck[i].getSuit() === card.getSuit() && this.#deck[i].getRank() === card.getRank()) {
        return true;
      }
    }
    return false;
  }

  /**
   * @description This  method shuffle the cards from the
   * deck so that when you draw a card from the deck
   * @public
   */
  shuffle() {
    let newDeck = this.#deck;
    const size = this.#deck.length;
    let result = [];
    let pos;
    let card;
    let aux;

    for (let i = 0; i < size; ++i) {
      pos = Math.floor(Math.random() * newDeck.length);
      card = newDeck[pos];
      newDeck.splice(pos, 1);
      result.push(card);
    }

    this.#deck = result;
  }

  /**
   * @description this method sorts the cards in the deck.
   * @public
   */
  sort() {
    const suits = ['Clubs', 'Hearts', 'Diamonds', 'Spades'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let size;
    let categorie = [];
    let ordered = [];
    let result = [];
    for (let i = 0; i < suits.length; i++)  {
      for (let  j = 0; j < this.#deck.length; j++) {
        if (this.#deck[j].getSuit() === suits[i]) {
          categorie.push(this.#deck[j]);
        }
      }
      size = categorie.length;
      for (let j = 0; j < ranks.length; j++) {
        for (let k = 0; k < size;
           k++) {
          if (categorie[k].getRank() === ranks[j]) {
            ordered.push(categorie[k]);
          }
        }
      }
      if (i === 0) {
        result = ordered;
      } else {
        result = result.concat(ordered);
      }
      ordered = [];
      categorie = [];
    }
    this.#deck = result;
  }


  /**
   * @description This method exchanges the specified 
   * cards between a hand and the deck
   * @public
   * @param {Hand} hand hand with which to change
   * @param {Number} numberOfCards number of cards to change
   * @return {Hand} hand with the changes made
   */
  moveCards(hand, numberOfCards) {
    let handCard;
    let deckCard;
    for (let i = 0; i < numberOfCards; i++) {
      handCard = this.popCard();
      deckCard = hand.popCard();
      hand.addCard(handCard);
      this.addCard(deckCard);
    }
    return hand
  }

  /**
   * @description This method creates the appropriate number of hands, 
   * deals the appropriate number of cards per hand, 
   * and returns a list of Hands.
   * @public
   */
  dealHands(numberHands, numberCards) {
    let list = [];
    let hand;
    let card;
    for (let i = 0; i < numberHands; ++i) {
      hand = new Hand();
      for (let j = 0; j < numberCards; ++j) {
        card = this.popCard();
        hand.addCard(card);
      }
      list.push(hand);
    }

    return list;
  }
}

