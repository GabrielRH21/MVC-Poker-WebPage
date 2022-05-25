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
 * @description This class represent the board, to print anything.
 * @class
 */
export class Canvas {

  /**
   * @property {Object} body The canvas where we are going to print
   * the ball
   * @private
   */
  #body;

  /**
   * @property {Object} ctx The canvas context
   * @private
   */
  #ctx;

  #data

  /**
   * @property {Number} width The width of the canvas
   * @private
   */
  #width;

  /**
   * @property {Number} height The height of the  canvas
   * @private
   */
  #height;

  /**
   * @description Constructor of the class, attributes are instantiated here
   * @param {Number} canvasWidth  The width of the canvas
   * @param {Number} canvasHeight The height of the  canvas 
   */
  constructor(canvasWidth, canvasHeight, name) {
    this.#body = document.getElementById(name);
    this.#ctx = this.#body.getContext('2d');
    this.#body.width = canvasWidth - 75;
    this.#body.height = canvasHeight - 75;
    this.#width = canvasWidth;
    this.#height = canvasHeight;

    /*let img = new Image();
    img.onload = () => {
      this.#ctx.drawImage(img, 0, 0, this.#body.width / 5, this.#body.height);
      console.log('Se ha cargado');
    };
    img.src = "/js/Model/img/2D.png";
    this.#ctx.drawImage(img, 0, 0);
    this.#ctx.stroke()*/
  }



  /**
   * @description This method return the canvas
   * @public
   * @return {Object} The canvas
   */
  getBody() {
    return this.#body;
  }

  getWidth() {
    return this.#body.width;
  }

  getHeight() {
    return this.#body.height;
  }

  /**
   * @description This method return the context canvas
   * @public
   * @return {Object}  The context canvas
   */
  getCtx() {
    return this.#ctx;
  }

  /**
   * @description This method create the canvas
   * @public
   */
  build() {
    this.#ctx.lineWidth = 0.5;
    this.#ctx.fillStyle = 'white';
    this.#ctx.strokeStyle = '#999';
    this.#ctx.fillRect(0, 0, this.#width, this.#height);
  }

  /**
   * @description This method update the canvas
   * @public
   */
  update() {
    this.#ctx.clearRect(0, 0, this.#body.width, this.#body.height);
    this.build();
  }

  /**
   * @description This method sets the new size of our canvas
   * @public
   * @param {Number} newWidth The new width of the canvas
   * @param {Numer} newHeight The new height of the canvas
   */
  resize(newWidth, newHeight) {
    this.#body.width = newWidth;
    this.#body.height = newHeight;
  }
}