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

import { PokerHand } from "../Model/pokerHand.js";

export class Controller {
  #buttonOne =  document.getElementById('dealOne');

  #buttonTwo =  document.getElementById('dealTwo');

  #boardOne;

  #boardTwo;

  #view;

  #hands;

  #deck;

  constructor(view, deck, first, second) {
    this.#view = view;
    this.#deck = deck;
    this.#boardOne = first;
    this.#boardTwo = second;
    let players = 2;
    let pokerCards = 5;
    let winner, reason;
    this.#hands = this.#deck.dealHands(players, pokerCards);
    this.#view.update(this.#boardOne, this.#hands[0]);
    this.#view.update(this.#boardTwo, this.#hands[1]);
    let hands = this.#hands;
    let firstPoker = new PokerHand(this.#hands[0]);
    let secondPoker = new PokerHand(this.#hands[1]);
    firstPoker.classify();
    secondPoker.classify();
    console.log(firstPoker.getType());
    console.log(secondPoker.getType());
    if (firstPoker.win(secondPoker)) {
      if (secondPoker.getType() === undefined) {
        reason = 'mayor carta';
      } else {
        reason = `${firstPoker.getType()}`
      }
      winner =  '1!! Por ' + reason;
    } else {
      if (secondPoker.getType() === undefined) {
        reason = 'mayor carta';
      } else {
        reason = `${secondPoker.getType()}`
      }
      
      winner = '2!! Por ' + reason;
    }
    view.updateWinner(winner);
    

    this.#buttonOne.addEventListener('click', function() {
      deck.moveCards(hands[0], 5);
      view.update(first, hands[0]);
      firstPoker = new PokerHand(hands[0]);
      firstPoker.classify();
      if (firstPoker.win(secondPoker)) {
        if (secondPoker.getType() === undefined) {
          reason = 'mayor carta';
        } else {
          reason = `${firstPoker.getType()}`
        }
        winner =  '1!! Por ' + reason;
      } else {
        if (secondPoker.getType() === undefined) {
          reason = 'mayor carta';
        } else {
          reason = `${secondPoker.getType()}`
        }
        
        winner = '2!! Por ' + reason;
      }
      view.updateWinner(winner);
    });

    this.#buttonTwo.addEventListener('click', function() {
      deck.moveCards(hands[1], 5);
      view.update(second, hands[1]);
      secondPoker = new PokerHand(hands[1]);
      secondPoker.classify();
      if (firstPoker.win(secondPoker)) {
        winner = 1;
      } else {
        winner = 2;
      }
      console.log(firstPoker.getType());
      console.log(secondPoker.getType());
      view.updateWinner(winner);
    });
  }
}