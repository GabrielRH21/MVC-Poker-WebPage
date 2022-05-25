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
 * @description This method update the values of the buttons 
 * on the web page
 * @public
 * @param {String} button Name of the button
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

  updateWinner(winner) {
    document.getElementById('winner').innerHTML = 'El ganador es el jugador ' + winner;
  }

}