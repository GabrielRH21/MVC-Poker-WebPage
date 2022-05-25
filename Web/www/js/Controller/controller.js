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

  /**
   * @property {Object} buttonOne This is the first button that interact with
   * the first hand
   * @private
   */
  #buttonOne =  document.getElementById('dealOne');

  /**
   * @property {Object} buttonTwo This is the second button that interact with
   * the second hand
   * @private
   */
  #buttonTwo =  document.getElementById('dealTwo');

  /**
   * @property {Object} firstCanvas This is the first canvas html element 
   * @private
   */
  #firstCanvas = document.getElementById('firstcanvas');

  /**
   * @property {Object} secondCanvas This is the second canvas html element 
   * @private
   */
  #secondCanvas = document.getElementById('secondcanvas');

  /**
   * @property {Canvas} boardOne This is the canvas that contains the first hand
   * @private
   */
  #boardOne;

  /**
   * @property {Canvas} boardTwo This is the canvas that contains the second hand
   * @private
   */
  #boardTwo;

  #buttonePlay = document.getElementById('play');

  /**
   * @property {View} view The view of  the program
   * @private
   */
  #view;

  /**
   * @property {Array} hands Array with the hands that are playing
   */
  #hands;

  #firstPoker

  #secondPoker

  #step = document.getElementById('step');

  #showThree = document.getElementById('stepthree');

  #showFive = document.getElementById('stepfive');

  /**
   * @property {Deck} deck Deck with cards
   * @private
   */
  #deck;

  /**
   * @description constructor of the class, it collects the events 
   * launched by the buttons and manage the model and the view
   * @param {View} view The view of  the program
   * @param {Deck} deck Deck with cards
   * @param {Canvas} first This is the canvas that contains the first hand
   * @param {Canvas} second This is the canvas that contains the first hand
   */
  constructor(view, deck, first, second) {
    this.#view = view;
    this.#deck = deck;
    this.#boardOne = first;
    this.#boardTwo = second;
    let players = 2;
    let pokerCards = 5;
    let winner, reason, loser;
    this.#hands = this.#deck.dealHands(players, pokerCards);
    this.#view.updateBack(this.#boardOne, this.#hands[0]);
    this.#view.updateBack(this.#boardTwo, this.#hands[1]);
    let hands = this.#hands;
    let firstPoker = new PokerHand(this.#hands[0]);
    let secondPoker = new PokerHand(this.#hands[1]);
    firstPoker.classify();
    secondPoker.classify();
    console.log(firstPoker.getType());
    console.log(secondPoker.getType());
    if (firstPoker.win(secondPoker)) {
      if (firstPoker.getType() === undefined) {
        reason = 'mayor carta';
      } else {
        reason = `${firstPoker.getType()}`
      }
      winner =  '1!! Por ' + reason;
      loser = secondPoker.getType();
    } else {
      if (secondPoker.getType() === undefined) {
        reason = 'mayor carta';
      } else {
        reason = `${secondPoker.getType()}`
      }
      
      winner = '2!! Por ' + reason;
      loser = firstPoker.getType();
    }
    view.updateWinner(winner, loser);

    view.playOne(firstPoker.getType())
    view.playTwo(secondPoker.getType());
    

    this.#buttonOne.addEventListener('click', function() {
      if (deck.moveCards(hands[0], 5) === false) {
        view.advise();
      } 

      if (hands[0].getBack()) {
        view.update(first, hands[0])
      } else {
        view.updateBack(first, hands[0]);
      }

      firstPoker = new PokerHand(hands[0]);
      firstPoker.classify();
      if (firstPoker.win(secondPoker)) {
        if (firstPoker.getType() === undefined) {
          reason = 'mayor carta';
        } else {
          reason = `${firstPoker.getType()}`
        }
        winner =  '1!! Por ' + reason;
        loser = secondPoker.getType();
      } else {
        if (secondPoker.getType() === undefined) {
          reason = 'mayor carta';
        } else {
          reason = `${secondPoker.getType()}`
        }
        
        winner = '2!! Por ' + reason;
        loser = firstPoker.getType();
      }
      view.updateWinner(winner, loser);

      view.playOne(firstPoker.getType())
      view.playTwo(secondPoker.getType());
    });

    this.#buttonTwo.addEventListener('click', function() {
      if (deck.moveCards(hands[1], 5) === false) {
        view.advise();
      } 

      if (hands[1].getBack()) {
        view.update(second, hands[1])
      } else {
        view.updateBack(second, hands[1]);
      }

      secondPoker = new PokerHand(hands[1]);
      secondPoker.classify();
      if (firstPoker.win(secondPoker)) {
        if (secondPoker.getType() === undefined) {
          reason = 'mayor carta';
        } else {
          reason = `${firstPoker.getType()}`
        }
        winner =  '1!! Por ' + reason;
        loser = secondPoker.getType();
      } else {
        if (secondPoker.getType() === undefined) {
          reason = 'mayor carta';
        } else {
          reason = `${secondPoker.getType()}`
        }
        
        winner = '2!! Por ' + reason;
        loser = firstPoker.getType();
      }
      view.updateWinner(winner, loser);

      view.playOne(firstPoker.getType())
      view.playTwo(secondPoker.getType());
    });

    this.#firstCanvas.addEventListener('click', function() {
      if (deck.moveCards(hands[0], 5) === true) {
        view.advise();
      } else {
        hands[0].setBack();
        if (hands[0].getBack()) {
          view.update(first, hands[0])
        } else {
          view.updateBack(first, hands[0]);
        }

        firstPoker = new PokerHand(hands[0]);
        firstPoker.classify();
        if (firstPoker.win(secondPoker)) {
          if (firstPoker.getType() === undefined) {
            reason = 'mayor carta';
          } else {
            reason = `${firstPoker.getType()}`
          }
          winner =  '1!! Por ' + reason;
          loser = secondPoker.getType();
        } else {
          if (secondPoker.getType() === undefined) {
            reason = 'mayor carta';
          } else {
            reason = `${secondPoker.getType()}`
            
          }
          
          winner = '2!! Por ' + reason;
          loser = firstPoker.getType();
        }
        view.updateWinner(winner, loser);

        view.playOne(firstPoker.getType())
        view.playTwo(secondPoker.getType());
      }

      
    });

    this.#secondCanvas.addEventListener('click', function() {
      if (deck.moveCards(hands[1], 5) === true) {
        view.advise();
      } else {
        hands[1].setBack();
        if (hands[1].getBack()) {
          view.update(second, hands[1])
        } else {
          view.updateBack(second, hands[1]);
        }

        secondPoker = new PokerHand(hands[1]);
        secondPoker.classify();
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
          loser = firstPoker.getType();
        }
        view.updateWinner(winner, loser);
        view.playOne(firstPoker.getType())
        view.playTwo(secondPoker.getType());
      }
     
    });

    this.#buttonePlay.addEventListener('click', function() {
      if (deck.moveCards(hands[1], 5) === true) {
        view.advise();
      } else {
        hands[1].setBack();
        if (hands[1].getBack()) {
          view.update(second, hands[1])
        } else {
          view.updateBack(second, hands[1]);
        }

        secondPoker = new PokerHand(hands[1]);
        secondPoker.classify();
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
          loser = firstPoker.getType();
        }
        view.updateWinner(winner, loser);
        view.playOne(firstPoker.getType())
        view.playTwo(secondPoker.getType());
      }

      if (deck.moveCards(hands[0], 5) === true) {
        view.advise();
      } else {
        hands[0].setBack();
        if (hands[0].getBack()) {
          view.update(first, hands[0])
        } else {
          view.updateBack(first, hands[0]);
        }

        firstPoker = new PokerHand(hands[0]);
        firstPoker.classify();
        if (firstPoker.win(secondPoker)) {
          if (firstPoker.getType() === undefined) {
            reason = 'mayor carta';
          } else {
            reason = `${firstPoker.getType()}`
          }
          winner =  '1!! Por ' + reason;
          loser = secondPoker.getType();
        } else {
          if (secondPoker.getType() === undefined) {
            reason = 'mayor carta';
          } else {
            reason = `${secondPoker.getType()}`
            
          }
          
          winner = '2!! Por ' + reason;
          loser = firstPoker.getType();
        }
        view.updateWinner(winner, loser);

        view.playOne(firstPoker.getType())
        view.playTwo(secondPoker.getType());
      }
    });

    this.#step.addEventListener('click', function() {
      view.update(first, hands[0]);
    });

    this.#showThree.addEventListener('click', function() {
      view.stepThree(second, hands[1]);
    });

    this.#showFive.addEventListener('click', function() {
      view.update(second, hands[1]);
    });

  }

  EventOne() {
    let deck = this.#deck;
    let hands = this.#hands;
    let first = this.#firstCanvas;
    let view = this.#view
    let reason, winner;

    this.#buttonOne.addEventListener('click', function() {
      deck.moveCards(hands[0], 5);

      if (hands[0].getBack()) {
        view.update(first, hands[0])
      } else {
        view.updateBack(first, hands[0]);
      }

      firstPoker = new PokerHand(hands[0]);
      firstPoker.classify();
      if (firstPoker.win(secondPoker)) {
        if (firstPoker.getType() === undefined) {
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
      view.updateWinner(winner, loser);
    });

    
  }

  
}