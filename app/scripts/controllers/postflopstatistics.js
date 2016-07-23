
'use strict';

/**
 * @ngdoc function
 * @name postflopStatisticsApp.controller:PostflopstatisticsCtrl
 * @description
 * # PostflopstatisticsCtrl
 * Controller of the postflopStatisticsApp
 */
angular.module('postflopStatisticsApp')
 	.controller('PostflopstatisticsCtrl', PostflopstatisticsCtrl);


PostflopstatisticsCtrl.$inject = ['$scope', '$document'];

function PostflopstatisticsCtrl($scope, $document) {

	/* jshint validthis: true*/
	var vm = this;

		// si usa solo el slide es igual a tipoPlayer pero sino cambua a custom
 	vm.basado = 'Fish';
 	// al inicio toma el mismo valor de arriba pero luego cambia con el dropDown
 	vm.tipoPlayer = vm.basado;

 	vm.shuffleButton = shuffleButton;
 	vm.desactivaButton = desactivaButton;

 	// board
 	vm.boardActive = [];
 	vm.clickBoard = clickBoard;
 	vm.clearBoard = clearBoard;
 	vm.desactivaButtonBoard = desactivaButtonBoard;

 	vm.cambiaTipoPlayer = cambiaTipoPlayer;
 	vm.porcentage = 0.0;
 	vm.typesPlayer = ['Card', 'Rock', 'Mouse', 'Monkey', 'Telephone', 'ABC', 'Lion',
    'Man', 'Whale', 'Eagle', 'Crow', 'ABC-FO', 'Dice', 'Fish'];
 	vm.matrix = [
		['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
		['AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
		['AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
		['AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
		['ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
		['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
		['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s'],
		['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s'],
		['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s'],
		['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s'],
		['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s'],
		['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s'],
		['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22']
	];
 	vm.board = [
		['Ad', 'Ac', 'Ah', 'As'],
		['Kd', 'Kc', 'Kh', 'Ks'],
		['Qd', 'Qc', 'Qh', 'Qs'],
		['Jd', 'Jc', 'Jh', 'Js'],
		['Td', 'Tc', 'Th', 'Ts'],
		['9d', '9c', '9h', '9s'],
		['8d', '8c', '8h', '8s'],
		['7d', '7c', '7h', '7s'],
		['6d', '6c', '6h', '6s'],
		['5d', '5c', '5h', '5s'],
		['4d', '4c', '4h', '4s'],
		['3d', '3c', '3h', '3s'],
		['2d', '2c', '2h', '2s']
	];
 	vm.slider = {
 		min: 0,
 		max: 0,
 		options: {
 			floor: 0,
 			ceil: 100
 		}
 	};

 	// calculos
 	vm.calcula = calcula;
 	vm.messagePost = '';

 	/*
	 * SEGUN LOS SIGUIENTES ARREGLOS SE DETERMINARA EL ORDEN EN QUE CARGARA EL SLIDER
	 'Card', 'Rock', 'Mouse', 'Monkey', 'Telephone', 'ABC', 'Lion', 'Man', 'Whale', 'Eagle', 'Crow', 'ABC FO', 'Dice', 'Fish'
	 */
	var ordenCard 		= ['AA', 'KK', 'AKs', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', 'AQs', '33', 'AKo', '22', 'AQo', 'AJs', 'ATs', 'AJo', 'ATo', 'A9s', 'A8s', 'KQs', 'A9o', 'A7s', 'KJs', 'A5s', 'A8o', 'A6s', 'A4s', 'KTs', 'A3s', 'A7o', 'KQo', 'A2s', 'A5o', 'A6o', 'A4o', 'KJo', 'QJs', 'A3o', 'K9s', 'A2o', 'QTs', 'KTo', 'K8s', 'K7s', 'JTs', 'K6s', 'K9o', 'QJo', 'Q9s', 'K5s', 'K8o', 'K4s', 'QTo', 'K3s', 'K7o', 'K2s', 'Q8s', 'K6o', 'J9s', 'K5o', 'Q9o', 'JTo', 'K4o', 'T9s', 'Q7s', 'Q6s', 'J8s', 'K3o', 'Q5s', 'K2o', 'Q8o', 'Q4s', 'Q3s', 'J9o', 'T8s', 'J7s', 'Q7o', 'Q2s', 'Q6o', '98s', 'Q5o', 'J8o', 'T9o', 'J6s', 'T7s', 'J5s', 'Q4o', 'J7o', 'J4s', 'Q3o', '97s', 'T8o', 'J3s', 'T6s', 'Q2o', '87s', 'J2s', 'J6o', '98o', '96s', 'T7o', 'J5o', 'T5s', 'T4s', '86s', 'J4o', 'T6o', '97o', 'T3s', '76s', '95s', 'J3o', 'T2s', '87o', '85s', '96o', 'T5o', '75s', 'J2o', '94s', '65s', 'T4o', '86o', '93s', '84s', '95o', 'T3o', '92s', '76o', '54s', '74s', 'T2o', '85o', '83s', '64s', '94o', '82s', '75o', '73s', '93o', '65o', '53s', '63s', '84o', '43s', '92o', '74o', '72s', '54o', '64o', '62s', '52s', '83o', '42s', '82o', '73o', '53o', '63o', '32s', '43o', '72o', '52o', '62o', '42o', '32o'];
	var ordenRock 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'JJ', 'TT', '99', 'AJs', '88', 'AJo', '77', '66', '55', 'KQs', 'KQo', 'ATs', 'KJs', '44', 'KJo', '33', 'A5s', 'A8s', 'QJs', 'A9s', 'QJo', 'JTs', 'KTs', 'JTo', 'A7s', 'KTo', 'A2s', 'K9s', 'ATo', 'T9s', 'J9s', 'A6s', 'A3s', 'A6o', 'QTs', 'J9o', '86s', 'A4s', 'A9o', '86o', 'QTo', '22', 'K4s', 'Q6s', 'T3s', '92s', '54s', 'Q8s', '92o', 'K4o', 'J3s', '98s', '74s', '43s', 'J8s', '87s', '65s', '54o', 'K2s', 'T8s', 'T9o', 'A3o', '87o', 'Q6o', 'T3o', 'A8o', 'A7o', 'A5o', 'A4o', 'A2o', 'K8s', 'K7s', 'K6s', 'K9o', 'Q9s', 'K5s', 'K8o', 'K3s', 'K7o', 'K6o', 'K5o', 'Q9o', 'Q7s', 'K3o', 'Q5s', 'K2o', 'Q8o', 'Q4s', 'Q3s', 'J7s', 'Q7o', 'Q2s', 'Q5o', 'J8o', 'J6s', 'T7s', 'J5s', 'Q4o', 'J7o', 'J4s', 'Q3o', '97s', 'T8o', 'T6s', 'Q2o', 'J2s', 'J6o', '98o', '96s', 'T7o', 'J5o', 'T5s', 'T4s', 'J4o', 'T6o', '97o', '76s', '95s', 'J3o', 'T2s', '85s', '96o', 'T5o', '75s', 'J2o', '94s', 'T4o', '93s', '84s', '95o', '76o', 'T2o', '85o', '83s', '64s', '94o', '82s', '75o', '73s', '93o', '65o', '53s', '63s', '84o', '74o', '72s', '64o', '62s', '52s', '83o', '42s', '82o', '73o', '53o', '63o', '32s', '43o', '72o', '52o', '62o', '42o', '32o'];
	var ordenMouse 		= ['AA', 'KK', 'AKs', 'QQ', 'JJ', 'TT', 'AQs', 'AQo', '99', 'ATs', 'AJs', 'KQs', 'ATo', 'AJo', '88', 'KQo', 'AKo', 'KJs', '77', 'QJs', 'KJo', 'JTs', 'T9s', 'A9s', 'T9o', 'QJo', 'JTo', 'A9o', '66', 'A8s', 'A8o', '55', 'A5s', 'J9s', 'A4s', 'J9o', 'QTs', 'KTs', 'A5o', '44', 'K8s', 'K8o', '33', 'A6s', 'QTo', '96s', 'K9s', '65s', 'Q8s', 'A7s', 'K5s', '22', 'K9o', 'Q8o', '96o', '65o', 'A6o', 'KTo', 'T7s', 'A3s', 'J2s', 'K6s', '97s', '98s', 'T8s', 'Q7s', 'K3s', '53s', 'K6o', 'A7o', 'Q5s', 'J2o', 'Q9s', 'Q2s', 'J7s', 'A3o', 'Q9o', 'A2s', 'T5s', '87s', '74s', 'K7s', '87o', 'T7o', '76s', 'Q7o', 'Q4s', 'Q2o', 'A4o', '95s', 'J8s', '97o', 'T8o', '76o', 'A2o', 'K7o', 'J7o', '98o', '74o', '84s', 'Q5o', 'T5o', 'Q3s', 'J6s', 'T6s', '54s', '63s', 'K4s', '86s', 'Q4o', '43s', '73s', 'J3s', 'Q3o', '64s', '93o', 'J8o', '43o', 'Q6s', 'K2s', '62s', '75s', 'J6o', '54o', 'T6o', '73o', 'J3o', '93s', '42s', 'K5o', 'K4o', 'K3o', 'K2o', 'Q6o', 'J5s', 'J4s', 'J5o', 'T4s', 'J4o', 'T3s', 'T2s', '85s', '94s', 'T4o', '86o', '95o', 'T3o', '92s', 'T2o', '85o', '83s', '94o', '82s', '75o', '84o', '92o', '72s', '64o', '52s', '83o', '82o', '53o', '63o', '32s', '72o', '52o', '62o', '42o', '32o'];
	var ordenMonkey 	= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'JJ', 'TT', 'ATs', 'ATo', 'KQs', 'KQo', 'KJs', 'KJo', '99', 'QJs', 'QJo', 'KTs', 'KTo', '88', '77', 'QTs', 'QTo', 'JTs', 'JTo', '66', '55', 'A9s', 'A9o', 'A8s', 'A8o', '44', 'A7s', 'A6s', 'A7o', 'K9s', 'A6o', 'K9o', 'A5s', '33', 'A5o', 'T9s', '22', 'A4s', 'T9o', 'A4o', 'A2s', 'J9s', 'A3s', 'J9o', 'Q9s', 'A3o', 'Q9o', 'K8s', '98s', 'T8s', 'A2o', 'K7s', '98o', 'J8s', 'K8o', 'J8o', '76s', '87s', '87o', 'K6s', 'Q8s', 'K7o', 'K5s', '65s', '54s', '75s', 'Q8o', '76o', 'Q7s', '97s', '97o', '65o', 'J7s', '86s', 'K4s', 'T6s', '96s', 'T8o', 'T7s', '43s', '86o', '64s', 'K6o', '96o', 'Q3s', '74s', '85s', 'Q4s', '54o', 'J4s', 'K3s', 'Q2s', 'Q5s', 'J6s', '53s', 'Q6s', '94s', 'K4o', 'K3o', 'K5o', 'Q7o', '75o', 'K2s', '95s', 'Q2o', 'T5s', 'J7o', 'K2o', '52s', 'T3s', 'Q6o', '63s', 'Q4o', 'Q5o', '84s', 'J6o', 'T6o', 'J4o', 'T7o', '43o', 'J2s', '53o', 'J5s', '85o', '92s', 'Q3o', '64o', '42s', '83s', '84o', '82s', 'T2s', 'J3s', '32s', 'T4s', '82o', '73s', '32o', '62s', 'J3o', '95o', 'J5o', '93s', '72s', 'J2o', '52o', '92o', 'T4o', '63o', '73o', 'T5o', '93o', 'T3o', '74o', '94o', '83o', 'T2o', '42o', '72o', '62o'];
	var ordenTelephone= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AJs', 'AJo', 'AQs', 'AQo', 'KQs', 'KQo', 'KJs', 'KJo', 'ATs', 'ATo', 'JJ', 'QJs', 'TT', 'QJo', 'A9s', 'A9o', 'KTs', 'KTo', 'QTs', 'QTo', '99', '88', '77', '66', 'A8s', 'A8o', 'JTs', 'JTo', '55', 'A7s', 'A7o', 'A5s', 'A5o', '44', 'A6s', 'A6o', 'T9s', '33', 'T9o', 'A4s', 'K9s', 'K9o', 'A4o', 'A2s', 'A2o', '22', 'A3s', 'A3o', 'Q9s', 'J9s', 'Q9o', 'J9o', '98s', '98o', '87s', '87o', 'K8s', 'J8s', 'K8o', 'J8o', 'Q8s', 'K7s', 'Q8o', 'T8s', 'T8o', 'K5s', 'K7o', '76s', '65s', '97s', '65o', 'K6s', '54s', '97o', 'J7s', 'J7o', 'K4s', '96s', 'K3s', 'Q7s', '86s', 'Q6s', 'T7s', 'Q6o', 'K6o', 'Q7o', '76o', 'K4o', '54o', '75s', 'T7o', 'K5o', 'T6s', '43s', '86o', 'Q4s', 'K2s', 'K2o', '96o', '64s', 'K3o', 'Q5s', 'Q5o', 'Q3s', '53s', 'Q2s', 'J6s', 'J6o', '75o', 'Q2o', 'J4s', 'Q4o', 'J2s', '95s', 'T5s', '43o', '85s', '32s', 'J5s', '64o', '84s', 'T6o', '74s', '53o', 'J4o', 'T2s', 'T3s', '74o', 'T4s', '83s', 'J3s', 'Q3o', '85o', '73s', '95o', '42s', '72s', '93s', 'J5o', '63s', '92s', 'T2o', '52s', '94s', '52o', 'J2o', '32o', '62s', '84o', 'T4o', 'T3o', '92o', '94o', '63o', 'T5o', '42o', '73o', 'J3o', '82s', '82o', '93o', '83o', '62o', '72o'];
	var ordenABC 			= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'JJ', 'TT', 'KQs', 'KQo', 'AJs', 'AJo', '99', '88', '77', '66', 'ATs', 'KJs', 'ATo', 'KJo', '55', '44', '33', '22', 'QJs', 'QJo', 'JTs', 'JTo', 'A9s', 'KTs', 'KTo', 'A2s', 'QTs', 'A8s', 'QTo', 'A9o', 'A8o', 'A6s', 'A6o', '87s', 'A7s', 'T9s', 'A7o', '76s', 'A5s', 'K9s', 'A4s', 'A3s', 'A3o', 'A4o', 'T8s', 'J9s', 'Q9s', '98s', '65s', 'T9o', '87o', 'K8s', 'K7s', '98o', 'Q9o', 'J8s', 'Q8s', 'J9o', '97s', 'A2o', 'K5s', '54s', 'J8o', 'A5o', 'Q8o', 'J6s', 'K9o', '86s', 'K6s', '32s', '32o', '43s', 'J2s', 'T5s', 'J7o', '42s', 'K8o', 'Q7s', 'K2s', '64s', 'T7s', '75s', 'J7s', '43o', 'K7o', 'Q4s', 'Q3s', '65o', 'T6s', 'Q3o', 'K5o', '76o', 'K4s', '97o', '83s', 'Q6s', 'Q7o', 'T8o', 'J3s', '72s', 'K4o', 'J3o', '94s', 'Q5o', 'Q5s', '63s', '85o', 'T5o', '95o', 'T6o', '62s', '52s', 'Q2s', '85s', 'J5s', '95s', 'T3o', '74s', '54o', 'K3s', 'T3s', 'K6o', 'J4s', 'K3o', 'K2o', 'Q6o', 'Q4o', 'Q2o', 'J6o', '96s', 'T7o', 'J5o', 'T4s', 'J4o', 'T2s', '96o', 'J2o', 'T4o', '86o', '93s', '84s', '92s', 'T2o', '94o', '82s', '75o', '73s', '93o', '53s', '84o', '92o', '74o', '64o', '83o', '82o', '73o', '53o', '63o', '72o', '52o', '62o', '42o'];
	var ordenLion 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'JJ', 'TT', '99', 'KQs', '88', 'KQo', '77', '66', 'AQs', '55', 'AQo', '44', '33', 'ATs', '22', 'ATo', 'AJs', 'A8s', 'AJo', 'KTs', 'J9s', 'QJs', 'JTs', 'JTo', 'QJo', 'A9s', 'KJs', 'A2s', 'KJo', 'A9o', 'K8s', 'A3s', 'A8o', 'A3o', 'T9s', 'K9s', 'QTs', 'K8o', 'T9o', 'A4s', 'Q9s', 'K7s', 'Q9o', 'K6s', 'A7o', 'A4o', 'T8o', 'Q7s', '96s', 'T8s', '43s', 'T7s', 'A5s', 'A7s', '98s', 'K5s', 'Q4s', 'Q2s', '87s', '65s', '32s', 'K2o', 'T6s', 'Q8o', 'Q4o', 'J8o', 'K9o', 'A5o', 'A2o', 'K7o', 'K2s', 'KTo', 'Q3s', '86s', 'J8s', 'J2s', 'Q8s', 'Q2o', 'J9o', '54s', 'Q5s', '76o', '87o', '65o', '98o', 'K4s', '76s', '63s', '86o', 'J7s', 'Q5o', '43o', '32o', 'A6s', 'A6o', 'QTo', 'K3s', 'K6o', 'K5o', 'K4o', 'Q6s', 'K3o', 'Q7o', 'Q6o', 'J6s', 'J5s', 'J7o', 'J4s', 'Q3o', '97s', 'J3s', 'J6o', 'T7o', 'J5o', 'T5s', 'T4s', 'J4o', 'T6o', '97o', 'T3s', '95s', 'J3o', 'T2s', '85s', '96o', 'T5o', '75s', 'J2o', '94s', 'T4o', '93s', '84s', '95o', 'T3o', '92s', '74s', 'T2o', '85o', '83s', '64s', '94o', '82s', '75o', '73s', '93o', '53s', '84o', '92o', '74o', '72s', '54o', '64o', '62s', '52s', '83o', '42s', '82o', '73o', '53o', '63o', '72o', '52o', '62o', '42o'];
	var ordenMan 			= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'JJ', 'KQs', 'KQo', 'TT', '99', 'ATs', 'ATo', '88', '77', 'KJs', 'KJo', '66', 'QJs', 'QJo', '55', '44', '33', 'JTs', 'KTs', 'KTo', 'JTo', '22', 'QTs', 'QTo', 'A9s', 'A9o', 'T9s', '98s', 'A8s', 'A4s', 'A8o', 'A5s', 'A2s', 'A7s', '87s', 'A3s', 'A6s', 'J9s', 'A7o', '76s', 'T8s', 'K9s', '65s', 'A5o', 'Q9s', 'T9o', 'A6o', '97s', 'J8s', 'A4o', 'K9o', 'A3o', 'J9o', 'Q9o', '54s', '86s', '98o', 'Q8s', 'K8s', 'A2o', 'K7s', '75s', '87o', 'K6s', 'T7s', 'K8o', '76o', 'K7o', '64s', 'Q7s', 'T8o', '43s', 'J7s', '97o', 'J8o', '96s', 'K4s', 'K3s', 'K5s', '85s', '65o', 'Q8o', 'K6o', 'K2s', 'Q6s', 'K5o', '95s', 'Q7o', '86o', 'T6s', '53s', '74s', '63s', 'Q5s', 'J7o', '42s', 'Q4s', 'J6s', '72s', 'Q3s', '54o', 'Q2s', '72o', 'Q6o', '75o', 'T7o', '32s', 'J4s', 'T6o', 'K2o', 'J3s', 'J5s', 'J2s', '84s', '96o', 'T4s', '52s', 'T2s', 'K4o', '73s', '62s', 'T3s', '82s', '64o', 'K3o', 'Q3o', 'T5s', '92s', 'Q5o', 'J2o', '42o', '83s', '94s', '93s', '43o', '63o', '93o', 'Q4o', 'J6o', 'J5o', 'J4o', '74o', '53o', 'T5o', 'T4o', '95o', '32o', '85o', '82o', '84o', 'J3o', 'Q2o', '52o', '92o', '94o', '83o', 'T3o', 'T2o', '73o', '62o'];
	var ordenWhale 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'JJ', 'TT', '99', 'ATs', 'ATo', '88', '77', 'KJs', 'KJo', '66', 'QJs', 'QJo', '55', '44', '33', 'A9s', 'A9o', 'JTs', 'JTo', '22', 'QTs', 'QTo', 'KTs', 'KTo', 'A8s', 'A8o', 'T9s', 'A5s', 'A7s', 'A6s', 'A3s', '98s', 'A4s', '87s', 'J9s', 'K9s', 'Q9s', '76s', 'T8s', 'A7o', 'A5o', '65s', 'A2s', 'T9o', 'A6o', 'A4o', '86s', 'A3o', 'K9o', 'J8s', 'Q8s', 'J9o', 'A2o', 'K8s', '97s', '54s', 'K7s', '98o', 'Q9o', '75s', 'K6s', '87o', '43s', 'K8o', 'T7s', 'K5s', '64s', '76o', 'T8o', 'J8o', 'K7o', 'K4s', 'Q8o', 'J7s', 'K2s', '65o', 'Q7s', '85s', 'K3s', '96s', '86o', '53s', '97o', 'Q7o', 'K6o', 'T7o', 'J6s', '32s', 'Q6s', '74s', 'J7o', 'T6s', 'K5o', 'J5s', '84s', 'Q5s', '54o', '42s', 'Q2s', 'Q2o', 'K3o', 'K2o', '75o', 'J4s', 'Q4o', 'Q6o', 'Q4s', 'T4s', '63s', 'T5s', 'K4o', '53o', 'Q3s', '95s', 'J5o', 'J6o', '64o', 'T5o', 'J3s', 'T2s', 'Q3o', '96o', 'J2s', '32o', 'Q5o', '84o', 'J2o', '85o', '73s', 'T2o', '42o', '94s', '83s', '63o', '52s', 'J4o', '82s', 'T3s', 'T6o', '83o', '93s', '43o', 'T4o', 'J3o', '93o', '73o', '72o', '72s', 'T3o', '74o', '94o', '92o', '95o', '92s', '62s', '52o', '82o', '62o'];
	var ordenEagle 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'JJ', 'TT', '99', 'ATs', 'ATo', '88', '77', 'KJs', 'KJo', '66', 'QJs', 'QJo', '55', '44', '33', '22', 'KTs', 'KTo', 'JTs', 'JTo', 'QTs', 'T9s', 'A9s', 'QTo', 'A9o', 'A5s', '98s', 'A7s', 'A2s', 'A8s', 'A4s', '76s', 'A3s', 'A8o', 'T8s', 'A6s', '87s', 'J9s', 'A5o', 'Q9s', 'A7o', 'T9o', 'A6o', 'K9s', 'K8s', 'K9o', '54s', '97s', '86s', '98o', '65s', '75s', 'A3o', 'A4o', 'K7s', 'J8s', 'Q8s', 'K8o', 'A2o', 'J9o', '43s', 'Q9o', '87o', 'K6s', 'T7s', '96s', '64s', 'K5s', 'J7s', 'K7o', '32s', 'Q7s', 'K4s', '76o', '65o', '97o', 'T8o', 'Q8o', 'K6o', 'T7o', 'J8o', 'K3s', '85s', '86o', '74s', 'J6s', '63s', 'K5o', 'Q4s', 'K2s', '54o', 'J4s', 'J7o', 'Q6s', 'Q3s', 'T6s', 'Q7o', '53s', 'J5s', '42s', 'K4o', 'K2o', 'Q5s', '52s', '84s', 'J5o', 'Q6o', 'T6o', 'T5s', '95s', '73s', 'K3o', 'T4s', 'J3s', 'Q2s', '96o', 'Q2o', 'Q5o', '53o', 'T2s', '75o', '94s', '74o', '62s', '64o', 'T3s', '62o', 'J2s', '85o', '52o', 'T4o', 'T2o', 'Q3o', 'J4o', '94o', 'J6o', '93o', 'J2o', '73o', 'T3o', '95o', '83s', '83o', '63o', '93s', 'J3o', '92s', '43o', '42o', '32o', 'Q4o', 'T5o', '82s', '84o', '92o', '72s', '82o', '72o'];
	var ordenCrow 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'ATs', 'ATo', 'JJ', 'KJs', 'KJo', 'TT', '99', '88', 'QJs', 'QJo', '77', '66', 'KTs', 'KTo', '55', 'JTs', 'JTo', 'QTs', 'QTo', 'A9s', 'A9o', '44', '33', 'A8s', 'A8o', '22', 'A7s', 'A7o', 'T9s', 'T9o', 'A5s', 'A5o', 'A6s', 'A6o', '98s', 'A2s', 'A3s', 'K9s', 'A4s', 'K9o', 'J9s', 'A4o', '87s', 'J9o', 'Q9s', 'Q9o', '76s', 'A3o', '98o', 'T8s', 'A2o', '97s', '65s', '86s', '87o', 'K8s', 'J8s', '54s', 'T8o', 'K7s', 'K8o', 'Q8s', '75s', '76o', 'K6s', 'T7s', '64s', 'Q8o', '65o', 'K4s', '43s', 'J8o', 'Q7s', '96s', 'K5s', '97o', 'K7o', '85s', 'J7s', 'K3s', 'T6s', 'K2s', '53s', 'T7o', 'Q6s', '86o', 'K6o', 'Q5s', '54o', 'Q7o', 'K5o', 'Q4s', '75o', 'K4o', '74s', 'Q3s', 'Q2s', 'J7o', '42s', '32s', '95s', '64o', 'J6s', 'Q5o', 'K3o', 'T5s', '43o', '96o', 'J3s', 'K2o', '52s', 'J2s', 'J5s', '63s', 'T6o', 'J4s', 'J6o', 'T4s', '62s', '94s', 'Q4o', '84s', 'Q6o', '32o', '85o', '73s', 'T3s', '53o', '95o', '92s', 'T5o', '74o', 'J2o', 'Q3o', 'Q2o', 'J4o', 'J5o', 'T2o', 'T2s', '83s', '72s', '42o', 'T4o', '52o', '82s', '73o', '63o', '84o', '62o', '93s', '83o', 'J3o', 'T3o', '94o', '93o', '82o', '92o', '72o'];
	var ordenABCFO 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'ATs', 'ATo', 'JJ', 'KJs', 'KJo', 'TT', '99', 'QJs', 'QJo', '88', '77', 'JTs', 'JTo', 'A9s', 'A9o', 'KTs', 'KTo', '66', 'QTs', 'QTo', '55', 'A8s', 'A8o', '44', '33', 'A7s', 'A7o', '22', 'A5s', 'A5o', 'A6s', 'A6o', 'T9s', 'T9o', 'A4s', 'A4o', 'A3s', '98s', 'K9s', 'K9o', '76s', 'J9s', 'A2s', '87s', 'J9o', 'A3o', 'Q9s', 'A2o', 'T8s', 'Q9o', '98o', 'K8s', '65s', '97s', 'J8s', 'K7s', '87o', 'Q8s', '54s', '86s', 'K8o', 'J8o', 'T8o', '76o', '75s', 'K6s', 'T7s', '43s', '64s', 'Q8o', 'Q7s', '96s', '65o', 'K7o', 'J7s', 'K5s', 'Q6s', 'K4s', 'K3s', '97o', '85s', '86o', 'K6o', 'Q7o', '74s', '53s', 'K2s', 'Q5s', 'J7o', 'K5o', 'T7o', 'T6s', '54o', 'J6s', '63s', '32s', 'K4o', 'J5s', 'J4s', '95s', 'Q4s', '42s', '43o', '75o', 'J3s', 'K3o', 'T5s', 'Q3s', '84s', 'Q6o', '64o', '96o', 'Q5o', 'J2s', 'Q2s', 'T4s', 'T6o', '52s', '53o', '94s', 'K2o', '85o', 'Q4o', '62s', '73s', '93s', 'T2s', 'J4o', 'Q3o', '32o', '95o', 'J5o', '72s', 'T5o', '72o', 'T3s', 'Q2o', '92s', 'J6o', '52o', '82s', '63o', '84o', 'T4o', '94o', 'T3o', 'J2o', '42o', '83s', '73o', '83o', '92o', 'J3o', '74o', 'T2o', '93o', '82o', '62o'];
	var ordenDice 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AJs', 'AJo', 'AQs', 'AQo', 'ATs', 'ATo', 'KJs', 'QJs', 'KJo', 'QJo', 'KQs', 'JJ', 'KQo', 'TT', 'A9s', 'A9o', 'A8s', 'JTs', 'A8o', 'JTo', 'QTs', 'QTo', 'KTs', 'A5s', 'KTo', 'A5o', '99', '88', 'A7s', 'A7o', 'A6s', 'A6o', 'T9s', 'T9o', '77', 'J9s', 'J9o', '98s', '98o', 'A3s', 'A3o', 'A4s', 'A4o', 'K9s', 'K9o', '66', '55', 'Q9s', 'Q9o', '87s', '87o', 'A2s', 'A2o', '44', '33', '22', '97s', '97o', 'K8s', '76s', 'K8o', '76o', 'T8s', 'T8o', 'K7s', 'K7o', 'J8s', 'J8o', 'Q8s', 'Q8o', '65s', '65o', 'K5s', '96s', 'K5o', '96o', '86s', '86o', 'K6s', 'Q7s', '54s', 'K2s', 'K2o', '54o', 'Q7o', 'T7s', 'K6o', '64s', 'T7o', 'K3s', 'K3o', '75s', 'T6s', '53s', 'T6o', '75o', '64o', '95s', 'K4s', '43s', 'K4o', '43o', '85s', 'Q6s', 'Q6o', 'J7s', 'Q5s', 'Q4s', 'J6s', 'Q5o', 'Q4o', 'J5s', 'J5o', 'J6o', '74s', '85o', '95o', 'Q3s', 'Q3o', 'J7o', '63s', 'Q2s', 'Q2o', '84s', 'T3s', '63o', 'T4s', 'T2s', '94s', '42s', '42o', '52s', '52o', 'J3s', '32s', 'J4s', '53o', 'T5s', 'J4o', 'T5o', '32o', '62s', '83s', '84o', '62o', '74o', 'T3o', '73s', '73o', '92s', '82s', '82o', 'J2s', 'J2o', 'J3o', '93s', 'T2o', 'T4o', '72s', '94o', '72o', '83o', '92o', '93o'];
	var ordenFish 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AJs', 'AJo', 'AQs', 'AQo', 'KQs', 'KQo', 'ATs', 'ATo', 'KJs', 'KJo', 'KTs', 'KTo', 'A9s', 'A9o', 'JTs', 'JTo', 'QJs', 'QJo', 'QTs', 'QTo', 'A8s', 'A8o', 'JJ', 'TT', '99', 'A7s', 'A7o', 'A6s', 'A6o', 'A5s', 'A5o', 'Q9s', 'Q9o', 'T9s', '88', 'T9o', '77', 'K9s', 'K9o', 'A4s', 'A4o', '66', 'A3s', 'A3o', 'J9s', 'J9o', '98s', '98o', '55', 'A2s', 'A2o', '44', '33', '87s', '87o', 'K8s', 'K8o', '22', 'T8s', 'T8o', 'Q8s', 'Q8o', 'J8s', 'J8o', '76s', '76o', 'K7s', 'K7o', 'K6s', 'K6o', '65s', '65o', '97s', '97o', '86s', '86o', 'K5s', '54s', '54o', 'K5o', 'Q7s', 'Q7o', 'T7s', 'T7o', 'J7s', 'J7o', 'K4s', 'K4o', 'Q6s', '75s', '75o', '96s', '64s', 'K3s', 'K3o', 'Q6o', 'Q5s', 'K2s', 'K2o', 'J4s', '96o', 'Q5o', 'J5s', '85s', '85o', '64o', '95s', 'J6s', 'T6s', '43s', '43o', 'Q4s', 'J6o', '53o', '53s', 'J3s', '74s', 'J2s', 'Q3s', '32s', '32o', '52s', 'J5o', '42s', 'Q4o', 'T5s', 'Q2s', 'T6o', '84s', 'T3s', 'T4s', '63s', 'Q2o', 'Q3o', '94s', 'J2o', 'J4o', 'T2s', 'J3o', '73s', '84o', '93s', '74o', '63o', '83s', '95o', '72s', 'T5o', '42o', '52o', '62s', '73o', '92s', 'T2o', 'T4o', '94o', '93o', '82s', 'T3o', '83o', '62o', '72o', '92o', '82o'];

 	var arraySlide = getArrayType(vm.tipoPlayer);
	var classSelected = 'btn-warning';

 	$scope.$on('slideEnded', function() {
 		updateButtons();
 	});
 	/**
 		* 	RESULTADOS
 	**/
 	var ordenPost 	= [
 										// NO MADE HANDS
										'N',			//0     no mismo ni overcards ni nada
										'PM',     //5     TIENE PAR LA MESA
										'NO',     //1
										'AH',     //2
										'PE',   	//3     PUEDEN SER OVER O HIGT PERO SI LE FALTA UNA PARA ESCALERA ENTRA AQUI
										'PC',     //4     PUEDEN SER OVERCARD, HIGT O PRO ESCALERA PERO SI LE FALTA UNA PARA COLOR MAYOR A DIEZ ENTRA ACA

										// MADE HANDS
										'WP',     //5     TIENE PAR Y HAY DOS CARTAS MAS ALTAS EN EL BOARD... noooo se incluyen los pares en mesa
										'MPB',    //6     PAR MEDIO TENGO CON EL BOARD SIN IMPORTAR EL KICKER
										'DPB',    //11    cuando hay un par en mesa es decir no vale ni pala question
										'MPA',    //7     PAR MEDIO EN MANO OSEA SALIO UNA ALTA A MI PAR
										'TPB',    //8     par alto CON KICKER BAJO
										'TPA',    //9     par alto CON KICKER ALTO
										'O',      //10    over pair  PUES
										'DPA',    //12    cuando no hay par en mesa y uso mis dos propias
										'TT',     //13    HAY UN PAR EN MESA Y TU TIENES UNA MAS OSEA TRIO, no se incluyen trios en mesa sino como full o nada
										'TS',     //14    TIENES PAR EN MANO Y SALE EL SET EN EL BOARD
										'S',      //15
										'C',      //16
										'F',  		//17
										'P'				//18 		incluye poker y escalera color
										];

	// mock basado yAA2233_
	var mockResultado1 = '{"infos":[{"c":[{"c":[{"c":[],"i":"WP_11886"},{"c":[],"i":"DPB_4685"},{"c":[],"i":"S_342"},{"c":[],"i":"TS_739"},{"c":[],"i":"C_358"},{"c":[],"i":"P_2"}],"i":"WP_18012"},{"c":[{"c":[],"i":"DPB_4150"},{"c":[],"i":"F_390"},{"c":[],"i":"C_51"},{"c":[],"i":"S_21"}],"i":"DPB_4612"},{"c":[{"c":[],"i":"TS_787"},{"c":[],"i":"F_175"},{"c":[],"i":"P_18"},{"c":[],"i":"C_15"},{"c":[],"i":"S_2"}],"i":"TS_997"},{"c":[{"c":[],"i":"C_144"}],"i":"C_144"},{"c":[{"c":[],"i":"S_111"},{"c":[],"i":"P_1"},{"c":[],"i":"C_1"}],"i":"S_113"}],"i":"WP_23878"},{"c":[{"c":[{"c":[],"i":"O_5972"},{"c":[],"i":"DPA_2377"},{"c":[],"i":"S_165"},{"c":[],"i":"TS_394"},{"c":[],"i":"C_196"}],"i":"O_9104"},{"c":[{"c":[],"i":"TS_369"},{"c":[],"i":"F_114"},{"c":[],"i":"P_14"},{"c":[],"i":"S_1"},{"c":[],"i":"C_4"}],"i":"TS_502"},{"c":[{"c":[],"i":"DPA_2059"},{"c":[],"i":"F_166"},{"c":[],"i":"C_30"},{"c":[],"i":"S_8"}],"i":"DPA_2263"},{"c":[{"c":[],"i":"C_63"}],"i":"C_63"},{"c":[{"c":[],"i":"S_37"}],"i":"S_37"}],"i":"O_11969"},{"c":[{"c":[{"c":[],"i":"F_689"},{"c":[],"i":"P_13"}],"i":"F_702"},{"c":[{"c":[],"i":"TS_3489"},{"c":[],"i":"P_106"},{"c":[],"i":"F_925"},{"c":[],"i":"S_23"},{"c":[],"i":"C_42"}],"i":"TS_4585"},{"c":[{"c":[],"i":"P_120"}],"i":"P_120"}],"i":"TS_5407"},{"c":[{"c":[{"c":[],"i":"DPA_2248"},{"c":[],"i":"F_215"},{"c":[],"i":"C_25"},{"c":[],"i":"S_7"},{"c":[],"i":"P_1"}],"i":"DPA_2496"},{"c":[{"c":[],"i":"F_204"},{"c":[],"i":"P_3"}],"i":"F_207"}],"i":"DPA_2703"},{"c":[{"c":[{"c":[],"i":"DPB_4399"},{"c":[],"i":"F_464"},{"c":[],"i":"C_54"},{"c":[],"i":"S_10"},{"c":[],"i":"P_1"}],"i":"DPB_4928"},{"c":[{"c":[],"i":"P_9"},{"c":[],"i":"F_482"}],"i":"F_491"}],"i":"DPB_5419"},{"c":[{"c":[{"c":[],"i":"P_121"}],"i":"P_121"}],"i":"P_121"},{"c":[{"c":[{"c":[],"i":"F_474"},{"c":[],"i":"P_17"}],"i":"F_491"},{"c":[{"c":[],"i":"P_12"}],"i":"P_12"}],"i":"F_503"}]}';
	var mockResultado2 = '{"infos":[{"c":[{"c":[{"c":[],"i":"TPB_2548"},{"c":[],"i":"DPA_996"},{"c":[],"i":"S_86"},{"c":[],"i":"DPB_38"},{"c":[],"i":"C_84"},{"c":[],"i":"MPB_134"},{"c":[],"i":"TT_182"},{"c":[],"i":"WP_22"}],"i":"TPB_4090"},{"c":[{"c":[],"i":"TT_203"},{"c":[],"i":"F_56"},{"c":[],"i":"P_4"},{"c":[],"i":"S_1"},{"c":[],"i":"C_2"}],"i":"TT_266"},{"c":[{"c":[],"i":"WP_23"},{"c":[],"i":"S_3"},{"c":[],"i":"DPA_5"},{"c":[],"i":"DPB_4"},{"c":[],"i":"C_1"}],"i":"WP_36"},{"c":[{"c":[],"i":"S_28"}],"i":"S_28"},{"c":[{"c":[],"i":"DPA_955"},{"c":[],"i":"C_15"},{"c":[],"i":"F_88"},{"c":[],"i":"DPB_22"},{"c":[],"i":"S_4"},{"c":[],"i":"P_1"}],"i":"DPA_1085"},{"c":[{"c":[],"i":"WP_39"},{"c":[],"i":"MPB_123"},{"c":[],"i":"DPB_48"},{"c":[],"i":"S_6"},{"c":[],"i":"DPA_14"},{"c":[],"i":"C_5"},{"c":[],"i":"TT_11"}],"i":"MPB_246"},{"c":[{"c":[],"i":"DPB_33"},{"c":[],"i":"F_8"},{"c":[],"i":"DPA_2"},{"c":[],"i":"S_1"}],"i":"DPB_44"},{"c":[{"c":[],"i":"C_36"}],"i":"C_36"}],"i":"TPB_5831"},{"c":[{"c":[{"c":[],"i":"PM_335"},{"c":[],"i":"DPB_132"},{"c":[],"i":"TT_25"},{"c":[],"i":"C_3"},{"c":[],"i":"DPA_8"}],"i":"PM_503"},{"c":[{"c":[],"i":"PE_240"},{"c":[],"i":"N_151"},{"c":[],"i":"PM_218"},{"c":[],"i":"PC_56"},{"c":[],"i":"MPB_92"},{"c":[],"i":"S_7"},{"c":[],"i":"TPB_12"},{"c":[],"i":"C_1"}],"i":"N_777"},{"c":[{"c":[],"i":"PE_314"},{"c":[],"i":"PM_225"},{"c":[],"i":"C_1"},{"c":[],"i":"WP_59"},{"c":[],"i":"S_66"},{"c":[],"i":"MPB_43"},{"c":[],"i":"PC_51"},{"c":[],"i":"TPB_14"},{"c":[],"i":"N_13"}],"i":"PE_786"},{"c":[{"c":[],"i":"MPB_144"},{"c":[],"i":"TT_8"},{"c":[],"i":"DPB_47"},{"c":[],"i":"WP_37"},{"c":[],"i":"DPA_15"},{"c":[],"i":"C_2"}],"i":"MPB_253"},{"c":[{"c":[],"i":"PC_46"},{"c":[],"i":"C_29"},{"c":[],"i":"WP_5"},{"c":[],"i":"PM_27"},{"c":[],"i":"S_5"},{"c":[],"i":"MPB_6"},{"c":[],"i":"TPB_1"}],"i":"PC_119"},{"c":[{"c":[],"i":"WP_6"},{"c":[],"i":"DPA_16"},{"c":[],"i":"TPB_28"}],"i":"TPB_50"}],"i":"N_2488"},{"c":[{"c":[{"c":[],"i":"DPB_667"},{"c":[],"i":"F_92"},{"c":[],"i":"DPA_36"},{"c":[],"i":"S_9"},{"c":[],"i":"C_10"}],"i":"DPB_814"},{"c":[{"c":[],"i":"PM_3324"},{"c":[],"i":"DPB_991"},{"c":[],"i":"DPA_347"},{"c":[],"i":"TT_192"},{"c":[],"i":"C_84"},{"c":[],"i":"S_107"}],"i":"PM_5045"},{"c":[{"c":[],"i":"F_63"},{"c":[],"i":"TT_201"},{"c":[],"i":"C_2"},{"c":[],"i":"P_6"},{"c":[],"i":"S_1"}],"i":"TT_273"},{"c":[{"c":[],"i":"DPA_365"},{"c":[],"i":"DPB_44"},{"c":[],"i":"F_43"},{"c":[],"i":"S_3"},{"c":[],"i":"C_6"}],"i":"DPA_461"},{"c":[{"c":[],"i":"S_42"}],"i":"S_42"},{"c":[{"c":[],"i":"C_28"}],"i":"C_28"}],"i":"PM_6663"},{"c":[{"c":[{"c":[],"i":"F_136"},{"c":[],"i":"DPA_1296"},{"c":[],"i":"DPB_47"},{"c":[],"i":"C_23"},{"c":[],"i":"S_4"}],"i":"DPA_1506"},{"c":[{"c":[],"i":"F_150"},{"c":[],"i":"P_1"}],"i":"F_151"},{"c":[{"c":[],"i":"DPB_84"},{"c":[],"i":"F_7"},{"c":[],"i":"DPA_5"},{"c":[],"i":"C_2"},{"c":[],"i":"S_1"}],"i":"DPB_99"}],"i":"DPA_1756"},{"c":[{"c":[{"c":[],"i":"PM_81"},{"c":[],"i":"N_55"},{"c":[],"i":"PE_114"},{"c":[],"i":"TPB_6"},{"c":[],"i":"MPB_26"},{"c":[],"i":"PC_26"},{"c":[],"i":"S_2"}],"i":"N_310"},{"c":[{"c":[],"i":"TPB_15"},{"c":[],"i":"C_40"},{"c":[],"i":"PM_42"},{"c":[],"i":"PC_82"},{"c":[],"i":"MPB_8"},{"c":[],"i":"TPA_10"},{"c":[],"i":"S_6"}],"i":"PC_203"},{"c":[{"c":[],"i":"PC_58"},{"c":[],"i":"PE_382"},{"c":[],"i":"MPB_38"},{"c":[],"i":"PM_214"},{"c":[],"i":"S_73"},{"c":[],"i":"N_14"},{"c":[],"i":"TPB_31"},{"c":[],"i":"TPA_42"},{"c":[],"i":"NO_3"},{"c":[],"i":"C_1"}],"i":"PE_856"},{"c":[{"c":[],"i":"PE_399"},{"c":[],"i":"C_4"},{"c":[],"i":"PM_315"},{"c":[],"i":"NO_177"},{"c":[],"i":"N_73"},{"c":[],"i":"TPB_58"},{"c":[],"i":"TPA_97"},{"c":[],"i":"S_11"},{"c":[],"i":"PC_77"}],"i":"NO_1211"},{"c":[{"c":[],"i":"TPA_103"},{"c":[],"i":"DPA_63"},{"c":[],"i":"MPB_49"},{"c":[],"i":"TT_12"},{"c":[],"i":"C_5"}],"i":"TPA_232"},{"c":[{"c":[],"i":"TT_26"},{"c":[],"i":"PM_489"},{"c":[],"i":"C_7"},{"c":[],"i":"DPB_90"},{"c":[],"i":"DPA_95"}],"i":"PM_707"},{"c":[{"c":[],"i":"TPB_90"},{"c":[],"i":"MPB_21"},{"c":[],"i":"DPA_44"},{"c":[],"i":"TT_7"},{"c":[],"i":"DPB_8"},{"c":[],"i":"C_1"}],"i":"TPB_171"},{"c":[{"c":[],"i":"S_4"}],"i":"S_4"}],"i":"NO_3694"},{"c":[{"c":[{"c":[],"i":"PE_905"},{"c":[],"i":"TPB_133"},{"c":[],"i":"C_6"},{"c":[],"i":"S_174"},{"c":[],"i":"WP_135"},{"c":[],"i":"PM_583"},{"c":[],"i":"PC_130"},{"c":[],"i":"AH_88"},{"c":[],"i":"MPB_10"},{"c":[],"i":"TPA_6"}],"i":"PE_2170"},{"c":[{"c":[],"i":"PE_1468"},{"c":[],"i":"AH_1173"},{"c":[],"i":"PM_1372"},{"c":[],"i":"WP_257"},{"c":[],"i":"PC_354"},{"c":[],"i":"TPB_304"},{"c":[],"i":"MPB_54"},{"c":[],"i":"S_122"},{"c":[],"i":"C_15"},{"c":[],"i":"TPA_7"}],"i":"AH_5126"},{"c":[{"c":[],"i":"DPB_445"},{"c":[],"i":"PM_1535"},{"c":[],"i":"TT_101"},{"c":[],"i":"DPA_171"},{"c":[],"i":"C_23"},{"c":[],"i":"S_21"}],"i":"PM_2296"},{"c":[{"c":[],"i":"DPB_99"},{"c":[],"i":"WP_352"},{"c":[],"i":"DPA_37"},{"c":[],"i":"TT_19"},{"c":[],"i":"S_4"},{"c":[],"i":"C_6"}],"i":"WP_517"},{"c":[{"c":[],"i":"S_109"},{"c":[],"i":"P_1"}],"i":"S_110"},{"c":[{"c":[],"i":"TPB_52"},{"c":[],"i":"PC_288"},{"c":[],"i":"C_130"},{"c":[],"i":"PM_153"},{"c":[],"i":"P_3"},{"c":[],"i":"S_22"},{"c":[],"i":"WP_26"},{"c":[],"i":"MPB_5"},{"c":[],"i":"TPA_1"}],"i":"PC_680"},{"c":[{"c":[],"i":"TT_36"},{"c":[],"i":"TPB_514"},{"c":[],"i":"DPA_169"},{"c":[],"i":"S_7"},{"c":[],"i":"C_3"}],"i":"TPB_729"},{"c":[{"c":[],"i":"MPB_56"},{"c":[],"i":"WP_77"},{"c":[],"i":"TT_7"},{"c":[],"i":"DPB_25"},{"c":[],"i":"C_2"},{"c":[],"i":"DPA_11"},{"c":[],"i":"S_3"}],"i":"MPB_181"},{"c":[{"c":[],"i":"TPA_16"},{"c":[],"i":"TT_6"},{"c":[],"i":"MPB_17"},{"c":[],"i":"DPA_10"},{"c":[],"i":"S_1"},{"c":[],"i":"C_1"}],"i":"TPA_51"}],"i":"AH_11860"},{"c":[{"c":[{"c":[],"i":"DPA_64"},{"c":[],"i":"WP_567"},{"c":[],"i":"C_17"},{"c":[],"i":"DPB_201"},{"c":[],"i":"S_35"},{"c":[],"i":"TT_31"},{"c":[],"i":"P_1"}],"i":"WP_916"},{"c":[{"c":[],"i":"DPA_189"},{"c":[],"i":"S_4"},{"c":[],"i":"F_16"},{"c":[],"i":"DPB_5"},{"c":[],"i":"C_1"}],"i":"DPA_215"},{"c":[{"c":[],"i":"MPB_699"},{"c":[],"i":"DPA_112"},{"c":[],"i":"TT_76"},{"c":[],"i":"DPB_301"},{"c":[],"i":"WP_307"},{"c":[],"i":"S_33"},{"c":[],"i":"C_27"}],"i":"MPB_1555"},{"c":[{"c":[],"i":"DPB_367"},{"c":[],"i":"DPA_27"},{"c":[],"i":"F_30"},{"c":[],"i":"C_5"},{"c":[],"i":"S_1"}],"i":"DPB_430"},{"c":[{"c":[],"i":"F_35"},{"c":[],"i":"TT_121"},{"c":[],"i":"S_1"},{"c":[],"i":"C_2"},{"c":[],"i":"P_1"}],"i":"TT_160"},{"c":[{"c":[],"i":"S_34"}],"i":"S_34"},{"c":[{"c":[],"i":"C_15"}],"i":"C_15"}],"i":"MPB_3325"},{"c":[{"c":[{"c":[],"i":"PE_1566"},{"c":[],"i":"PM_921"},{"c":[],"i":"WP_173"},{"c":[],"i":"PC_222"},{"c":[],"i":"TPB_140"},{"c":[],"i":"S_288"},{"c":[],"i":"AH_56"},{"c":[],"i":"MPB_112"},{"c":[],"i":"N_18"},{"c":[],"i":"TPA_21"},{"c":[],"i":"C_11"},{"c":[],"i":"NO_1"}],"i":"PE_3529"},{"c":[{"c":[],"i":"MPB_2"},{"c":[],"i":"PE_110"},{"c":[],"i":"PM_97"},{"c":[],"i":"PC_31"},{"c":[],"i":"AH_115"},{"c":[],"i":"TPB_26"},{"c":[],"i":"WP_27"},{"c":[],"i":"S_7"}],"i":"AH_415"},{"c":[{"c":[],"i":"S_23"},{"c":[],"i":"PC_152"},{"c":[],"i":"C_61"},{"c":[],"i":"PM_99"},{"c":[],"i":"MPB_9"},{"c":[],"i":"WP_11"},{"c":[],"i":"TPB_17"}],"i":"PC_372"},{"c":[{"c":[],"i":"PM_861"},{"c":[],"i":"DPB_293"},{"c":[],"i":"TT_65"},{"c":[],"i":"DPA_74"},{"c":[],"i":"S_88"},{"c":[],"i":"C_11"}],"i":"PM_1392"},{"c":[{"c":[],"i":"S_445"},{"c":[],"i":"C_4"}],"i":"S_449"},{"c":[{"c":[],"i":"TPB_187"},{"c":[],"i":"DPA_69"},{"c":[],"i":"TT_11"},{"c":[],"i":"MPB_9"},{"c":[],"i":"DPB_9"},{"c":[],"i":"S_18"},{"c":[],"i":"WP_4"},{"c":[],"i":"C_1"}],"i":"TPB_308"},{"c":[{"c":[],"i":"TPA_34"},{"c":[],"i":"DPA_10"},{"c":[],"i":"S_8"},{"c":[],"i":"MPB_9"},{"c":[],"i":"TT_4"},{"c":[],"i":"C_1"}],"i":"TPA_66"},{"c":[{"c":[],"i":"MPB_119"},{"c":[],"i":"DPB_45"},{"c":[],"i":"S_17"},{"c":[],"i":"DPA_16"},{"c":[],"i":"WP_27"},{"c":[],"i":"TT_6"},{"c":[],"i":"C_4"}],"i":"MPB_234"},{"c":[{"c":[],"i":"WP_170"},{"c":[],"i":"TT_12"},{"c":[],"i":"DPB_50"},{"c":[],"i":"S_8"},{"c":[],"i":"DPA_11"},{"c":[],"i":"C_3"},{"c":[],"i":"P_1"}],"i":"WP_255"},{"c":[{"c":[],"i":"MPB_12"},{"c":[],"i":"PC_9"},{"c":[],"i":"PE_23"},{"c":[],"i":"PM_26"},{"c":[],"i":"N_22"},{"c":[],"i":"TPB_2"},{"c":[],"i":"S_1"}],"i":"N_95"},{"c":[{"c":[],"i":"TPA_1"},{"c":[],"i":"PE_3"},{"c":[],"i":"PM_5"}],"i":"NO_9"}],"i":"PE_7124"},{"c":[{"c":[{"c":[],"i":"WP_115"},{"c":[],"i":"S_12"},{"c":[],"i":"MPB_216"},{"c":[],"i":"C_9"},{"c":[],"i":"DPA_34"},{"c":[],"i":"DPB_99"},{"c":[],"i":"TT_14"}],"i":"MPB_499"},{"c":[{"c":[],"i":"TPA_572"},{"c":[],"i":"DPA_296"},{"c":[],"i":"MPB_217"},{"c":[],"i":"TT_59"},{"c":[],"i":"C_22"},{"c":[],"i":"S_20"}],"i":"TPA_1186"},{"c":[{"c":[],"i":"TT_81"},{"c":[],"i":"F_22"},{"c":[],"i":"P_1"}],"i":"TT_104"},{"c":[{"c":[],"i":"F_45"},{"c":[],"i":"DPA_328"},{"c":[],"i":"DPB_65"},{"c":[],"i":"C_4"},{"c":[],"i":"S_1"}],"i":"DPA_443"},{"c":[{"c":[],"i":"S_10"}],"i":"S_10"},{"c":[{"c":[],"i":"C_9"}],"i":"C_9"}],"i":"TPA_2251"},{"c":[{"c":[{"c":[],"i":"DPB_248"},{"c":[],"i":"F_16"},{"c":[],"i":"DPA_18"},{"c":[],"i":"C_5"},{"c":[],"i":"S_4"}],"i":"DPB_291"},{"c":[{"c":[],"i":"WP_1030"},{"c":[],"i":"DPB_298"},{"c":[],"i":"DPA_110"},{"c":[],"i":"C_30"},{"c":[],"i":"TT_73"},{"c":[],"i":"S_39"}],"i":"WP_1580"},{"c":[{"c":[],"i":"F_27"},{"c":[],"i":"TT_50"},{"c":[],"i":"P_2"}],"i":"TT_79"},{"c":[{"c":[],"i":"DPA_124"},{"c":[],"i":"F_15"},{"c":[],"i":"S_1"},{"c":[],"i":"C_2"},{"c":[],"i":"DPB_1"}],"i":"DPA_143"},{"c":[{"c":[],"i":"S_13"}],"i":"S_13"},{"c":[{"c":[],"i":"C_13"}],"i":"C_13"}],"i":"WP_2119"},{"c":[{"c":[{"c":[],"i":"PM_150"},{"c":[],"i":"DPB_47"},{"c":[],"i":"DPA_11"},{"c":[],"i":"C_43"},{"c":[],"i":"TT_6"},{"c":[],"i":"S_4"}],"i":"PM_261"},{"c":[{"c":[],"i":"C_272"},{"c":[],"i":"P_3"}],"i":"C_275"},{"c":[{"c":[],"i":"PC_325"},{"c":[],"i":"WP_22"},{"c":[],"i":"TPB_39"},{"c":[],"i":"C_114"},{"c":[],"i":"PM_141"},{"c":[],"i":"MPB_11"},{"c":[],"i":"S_22"},{"c":[],"i":"TPA_4"},{"c":[],"i":"P_1"}],"i":"PC_679"},{"c":[{"c":[],"i":"DPA_2"},{"c":[],"i":"WP_24"},{"c":[],"i":"C_10"},{"c":[],"i":"S_1"},{"c":[],"i":"TT_2"},{"c":[],"i":"DPB_2"}],"i":"WP_41"},{"c":[{"c":[],"i":"S_26"},{"c":[],"i":"C_4"}],"i":"S_30"},{"c":[{"c":[],"i":"P_2"}],"i":"P_2"},{"c":[{"c":[],"i":"TPB_30"},{"c":[],"i":"DPA_21"},{"c":[],"i":"TT_3"},{"c":[],"i":"C_7"},{"c":[],"i":"WP_1"}],"i":"TPB_62"},{"c":[{"c":[],"i":"C_8"},{"c":[],"i":"WP_1"},{"c":[],"i":"DPA_1"},{"c":[],"i":"MPB_8"},{"c":[],"i":"DPB_1"}],"i":"MPB_19"},{"c":[{"c":[],"i":"TPA_9"},{"c":[],"i":"DPA_3"},{"c":[],"i":"MPB_1"},{"c":[],"i":"C_1"}],"i":"TPA_14"}],"i":"PC_1383"},{"c":[{"c":[{"c":[],"i":"P_10"},{"c":[],"i":"TT_510"},{"c":[],"i":"F_136"},{"c":[],"i":"S_7"},{"c":[],"i":"C_3"}],"i":"TT_666"},{"c":[{"c":[],"i":"F_84"},{"c":[],"i":"P_2"}],"i":"F_86"},{"c":[{"c":[],"i":"P_17"}],"i":"P_17"}],"i":"TT_769"},{"c":[{"c":[{"c":[],"i":"S_229"},{"c":[],"i":"C_5"},{"c":[],"i":"P_1"}],"i":"S_235"},{"c":[{"c":[],"i":"C_4"}],"i":"C_4"}],"i":"S_239"},{"c":[{"c":[{"c":[],"i":"DPB_248"},{"c":[],"i":"DPA_21"},{"c":[],"i":"F_24"},{"c":[],"i":"S_4"},{"c":[],"i":"C_2"}],"i":"DPB_299"},{"c":[{"c":[],"i":"F_33"},{"c":[],"i":"P_1"}],"i":"F_34"},{"c":[{"c":[],"i":"DPA_12"},{"c":[],"i":"F_2"}],"i":"DPA_14"}],"i":"DPB_347"},{"c":[{"c":[{"c":[],"i":"C_90"}],"i":"C_90"},{"c":[{"c":[],"i":"P_1"}],"i":"P_1"}],"i":"C_91"},{"c":[{"c":[{"c":[],"i":"F_51"},{"c":[],"i":"P_2"}],"i":"F_53"}],"i":"F_53"},{"c":[{"c":[{"c":[],"i":"P_7"}],"i":"P_7"}],"i":"P_7"}]}';
	// la respuesta del servidor
	vm.results = JSON.parse(mockResultado2);
	refactorMessage();

	// camibia el estado del button
	function shuffleButton(element, card){
		vm.basado = 'custom';
		if (element.attr('class').indexOf(classSelected) > -1) {
			desactivaButton(element, card);
			updatePorcentage(vm.porcentage - getValueCard(card));
		}else{
			activaButton(element, card);
			updatePorcentage(vm.porcentage + getValueCard(card));
		}
	}

	// activa o desactiva si es necesario
	function handlerCard(card, activa){

		var element = angular.element($document[0].querySelector('#card' + card));

		if (element.attr('class').indexOf(classSelected) > -1) {
			if(!activa){
				desactivaButton(element, card);
			}
		}else{
			if(activa){
				activaButton(element);
			}
		}
	}

	function activaButton(element){
		element.attr('class', 'btn ' + classSelected + ' btn-xs');
	}

	function desactivaButton(element, card){
		var typeButton = (card.length === 2) ?  'btn-success' : (card.indexOf('s') > 0) ? 'btn-default' : 'btn-default';
		element.attr('class', 'btn ' + typeButton + ' btn-xs');
	}

	// actualiza el tablero segun los valores del slide y del tipoPlater
	function updateButtons() {

		console.log('updateButtons', arraySlide);
		var sliderMin = vm.slider.min;
		var sliderMax = vm.slider.max;

		if(sliderMin === sliderMax){
			arraySlide.forEach(function(el){
				handlerCard(el, false);
			});
			$scope.$apply(function (){
				vm.basado = vm.tipoPlayer;
				vm.porcentage = 0.0;
			});
			return;
		}

		// the slider accept max < min
		var min = sliderMin < sliderMax ? sliderMin : sliderMax;
		var max = sliderMax > sliderMin ? sliderMax : sliderMin;

		var count = 0.0;
		var newPorcentage = 0.0;

		arraySlide.forEach(function(el){
			var previo = count;
			var valueCard = getValueCard(el);
			count += valueCard;
			// console.log('element', i, count);
			var pasaMin = (count >= min) && (count - min > valueCard / 2);
			var pasaMax = (count <= max) || ((count > max) && (count - max) < (max - previo));
			newPorcentage += pasaMin && pasaMax ? valueCard : 0;
			handlerCard(el, pasaMin && pasaMax);
		});

		$scope.$apply(function (){
			vm.basado = vm.tipoPlayer;
			updatePorcentage(newPorcentage);
		});
	}

	function getArrayType(tipo){

		switch(tipo){
			case 'Card':
				return ordenCard;
			case 'Rock':
				return ordenRock;
			case 'Mouse':
				return ordenMouse;
			case 'Monkey':
				return ordenMonkey;
			case 'Telephone':
				return ordenTelephone;
			case 'ABC':
				return ordenABC;
			case 'Lion':
				return ordenLion;
			case 'Man':
				return ordenMan;
			case 'Whale':
				return ordenWhale;
			case 'Eagle':
				return ordenEagle;
			case 'Crow':
				return ordenCrow;
			case 'ABC-FO':
				return ordenABCFO;
			case 'Dice':
				return ordenDice;
			case 'Fish':
				return ordenFish;
			default:
				// alert('algo no va nada bien :(');
				return ordenFish;
		}
	}

	function cambiaTipoPlayer(tipo){
		if(tipo === vm.tipoPlayer){
			return;
		}

		vm.tipoPlayer = tipo;
		arraySlide = getArrayType(tipo);
		updateButtons();
	}

	function getValueCard(card){
		return card.length === 2 ? 0.085 : card.indexOf('s') > -1 ?  0.3238 : 0.944;
	}

	// redondea y soluciona extrañas inesactitudes
	function updatePorcentage(value){
		value = Math.round(value * 1000) / 1000;
		vm.porcentage = value <= 0.04 ? 0.0 : value >= 99.96 ? 100.0 : value;
	}

	function desactivaButtonBoard(element, card){
    	switch(card.substring(1)){
    		case 'd':
					element.attr('class', 'btn btn-info btn-xs');
					break;
    		case 's':
					element.attr('class', 'btn btn-spade btn-xs');
					break;
				case 'h':
					element.attr('class', 'btn btn-danger btn-xs');
					break;
				case 'c':
					element.attr('class', 'btn btn-success btn-xs');
					break;
				default:
					element.attr('class', 'btn btn-default btn-xs');
		}
	}

	function clickBoard(element, card){

		var limit = 5;

		if(element.attr('class').indexOf(classSelected) > 0){
			desactivaButtonBoard(element, card);
			var index = vm.boardActive.indexOf(card);
			vm.boardActive.splice(index, 1);
		}else if (vm.boardActive.length < limit){
			activaButton(element);
			vm.boardActive.push(card);
		}
	}

	function clearBoard(){
		vm.boardActive.forEach(function(el){
			var element = angular.element($document[0].querySelector('#card' + el));
			desactivaButtonBoard(element, el);
		});
		vm.boardActive = [];
	}

	// recorre todos los seleccionados y crea un mensaje para enviarlo al servidor
	// vamos a recoorrer todo el tablero y tomaremos los activos y los que no, para enviar siempre el mensaje mas pequeno
	function calcula(){

		var aceptados = [];
		var noAcepatdos = [];

		arraySlide.forEach(function(el){
			var element = angular.element($document[0].querySelector('#card' + el));
			if(element.attr('class').indexOf(classSelected) > -1){
				aceptados.push(el);
			}else{
				noAcepatdos.push(el);
			}
		});

		// si el message empieza con mas tomas los aceptados
		var envia = aceptados.length < noAcepatdos.length ? '+' : '-';
		var enviaArray = aceptados.length < noAcepatdos.length ? aceptados : noAcepatdos;
		var enviaCards = '';
		enviaArray.forEach(function(el){
			var elMin = el.indexOf('o') > -1 ? el.substring(0, 2) : el;
			enviaCards += elMin;
		});

		var enviaBoard = '';
		vm.boardActive.forEach(function(el){
			enviaBoard += el;
		});

		// test
		// +8866K8sJ796s9664_Tc
		// +AAKKAKsQQAKAJsAJAQsAQKQsKQATsATKJsKJKTsKT_Tc9h6h5c7c
		// +AAKKAKsQQAKAJsAJAQsAQKQsKQATsATKJsKJKTsKT3365s83s73_
		// -9382sT38362729282_
		// -5262s7392sT2T4949382sT38362729282_5h7d9h3s
		vm.messagePost = envia + enviaCards + '_' + enviaBoard;
		console.log(vm.messagePost);
	}

	function refactorMessage(){
		var total = 0;
		vm.results.infos.forEach(function (info){
			total += parseInt(info.i.split('_')[1]);
		});

		vm.results.infos.forEach(function (info){
			evaluateChildren(info, total);
		});
	}

	function evaluateChildren(father, total){
		var infos 		= father.i.split('_');
		father.info 	= getName(infos[0]);
		father.veces	= parseInt(infos[1]);
		father.porc 	= Math.round((father.veces * 100 / total) * 10) / 10;
		father.fuerza = ordenPost.indexOf(infos[0]);
		var children 	= father.c;

		children.forEach(function (child){
			evaluateChildren(child, father.veces);
		});
	}


	function getName(letra){
		switch(letra){
			case 'N':
				return 'no made';
			case 'NO':
				return 'overcards';
			case 'AH':
				return 'ace hight';
			case 'PM':
				return 'board pair';
			case 'WP':
				return 'weak pair';
			case 'MPB':
				return 'weak medium pair';
			case 'PE':
				return 'straight projet';
			case 'PC':
				return 'color project';
			case 'DPB':
				return 'weak two pair';
			case 'MPA':
				return 'hight medium pair';
			case 'TPB':
				return 'weak top pair';
			case 'TPA':
				return 'hight top pair';
			case 'O':
				return 'overpair';
			case 'DPA':
				return 'hight two pair';
			case 'TT':
				return 'three kind trip';
			case 'TS':
				return 'three kind set';
			case 'S':
				return 'straight';
			case 'C':
				return 'flush';
			case 'F':
				return 'full house';
			case 'P':
				return 'plus';
			default:
				console.log('ingresa info para:', letra);
				return '';
		}
	}

}
