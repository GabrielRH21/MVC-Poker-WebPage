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

/**
 * @description This class takes care of the view of our program facing the user,
 */
export class View {

  /**
   * @property {Object} doc Html file
   * @private
   */
  #doc;

  /**
   * @description Constructor of the class, attributes are instantiated here
   * @param {Object} fileElement html file
   */
  constructor(fileElement) {
    this.#doc = fileElement;
  }

  /**
 * @description This method update the images of the cards
 * on the web page
 * @public
 * @param {Canvas} board canvas were we put the images
 * @param {Hand} hand hand that have the cards
 */
  update(board, hand) {
    let card;
    let image;
    const width = board.getWidth();
    const height = board.getHeight();
    let posX = 0;
    let posY = 0;
    let images = [];

    for (let i = 0; i < hand.getLength(); ++i) {
      card = hand.getCard(i);

      image = new Image();
      images.push(image)
      images[i].onload = () => {
        board.getCtx().drawImage(images[i], posX, posY, width / 5, height);
        posX +=  width / 5
      }
      images[i].src = card.getImage();

    }
  }

  /**
   * @description This method update the winner tittle.
   * @param {String} winner name and reason of the winner
   */
  updateWinner(winner, loser) {
    document.getElementById('winner').innerHTML = 'El ganador es el jugador ' + winner + ' vs '+ loser;
  }

  updateBack(board, hand) {
    let card;
    let image;
    const width = board.getWidth();
    const height = board.getHeight();
    let posX = 0;
    let posY = 0;
    let images = [];

    for (let i = 0; i < hand.getLength(); ++i) {
      card = hand.getCard(i);

      image = new Image();
      images.push(image)
      images[i].onload = () => {
        board.getCtx().drawImage(images[i], posX, posY, width / 5, height);
        posX +=  width / 5
      }
      images[i].src = 'js/Model/img/blue_back.png';

    }
  }

  advise() {
    document.getElementById('cards').innerHTML = 'No quedan cartas en el mazo';
  }

  playOne(plays) {
    document.getElementById('firstPlay').innerHTML = plays;
  }

  playTwo(plays) {
    document.getElementById('secondPlay').innerHTML = plays;
  }

  stepThree(board, hand) {
    let pos = Math.floor(Math.random() * 5);
    let iteration = 1;
    let positions = [pos];
    do {
      pos = Math.floor(Math.random() * 5);
      if (positions.includes(pos)) {

      } else {
        positions.push(pos);
        iteration++;
      }
    } while (iteration < 3);
    positions.sort();
    console.log(positions);
    let card;
    let image;
    const width = board.getWidth();
    const height = board.getHeight();
    let posX = 0;
    let posY = 0;
    let images = [];
    let aux = false; 
    iteration = 0;
    console.log(positions);
    for (let j = 0; j < hand.getLength(); ++j) {
      card = hand.getCard(j);
      image = new Image();
      images.push(image)
      images[j].onload = () => {
        board.getCtx().drawImage(images[j], posX, posY, width / 5, height);
        posX +=  width / 5
      }
      if (j === positions[iteration]) {
        images[j].src = card.getImage();
        iteration++;
      } else {
        images[j].src = 'js/Model/img/blue_back.png';
      }
    }
    
  }

}