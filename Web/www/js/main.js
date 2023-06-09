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

import { Controller } from './Controller/controller.js';
import { Canvas } from './Model/canvas.js';
import { Cards } from './Model/card.js'
import { Deck } from './Model/deck.js'
import { Hand } from './Model/hand.js';
import { PokerHand } from './Model/pokerHand.js';
import { View } from './View/view.js';

/**
 * @description This function creates the canvas and manages the poker program
 */
function main() {
  let firstboard = new Canvas(window.innerWidth - 150, window.innerHeight / 2 - 150, 'firstcanvas');
  let secondBoard = new Canvas(window.innerWidth - 100, window.innerHeight / 2 - 125, 'secondcanvas');
  let view = new View(document);
  let deck = new Deck();
  let controller = new Controller(view, deck, firstboard, secondBoard);
  /*let hand = new Hand();
  hand.addCard(new Cards('Diamonds', '10'));
  hand.addCard(new Cards('Clubs', '9'));
  hand.addCard(new Cards('Spades', '10'));
  hand.addCard(new Cards('Spades', 'K'));
  hand.addCard(new Cards('Hearts', 'K'));
  let pokerHand = new PokerHand(hand);
  pokerHand.classify();*/
  /*let players = 2;
  let pokerCards = 5;
  let hands = deck.dealHands(players, pokerCards);
  let view = new View(document);
  view.update(firstboard, hands[0]);
  view.update(secondBoard, hands[1]);*/
}

main();





