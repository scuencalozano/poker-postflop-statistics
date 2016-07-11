// (function() {

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
	 	vm.slider = {
	 		min: 0,
	 		max: 0,
	 		options: {
	 			floor: 0,
	 			ceil: 100
	 		}
	 	};

	 	/*
		 * SEGUN LOS SIGUIENTES ARREGLOS SE DETERMINARA EL ORDEN EN QUE CARGARA EL SLIDER
		 'Card', 'Rock', 'Mouse', 'Monkey', 'Telephone', 'ABC', 'Lion', 'Man', 'Whale', 'Eagle', 'Crow', 'ABC FO', 'Dice', 'Fish'
		 */
		var ordenCard 		= ['AA', 'KK', 'AKs', 'QQ', 'JJ', 'TT', '99', '88', '77', '66', '55', '44', 'AQs', '33', 'AKo', '22', 'AQo', 'AJs', 'ATs', 'AJo', 'ATo', 'A9s', 'A8s', 'KQs', 'A9o', 'A7s', 'KJs', 'A5s', 'A8o', 'A6s', 'A4s', 'KTs', 'A3s', 'A7o', 'KQo', 'A2s', 'A5o', 'A6o', 'A4o', 'KJo', 'QJs', 'A3o', 'K9s', 'A2o', 'QTs', 'KTo', 'K8s', 'K7s', 'JTs', 'K6s', 'K9o', 'QJo', 'Q9s', 'K5s', 'K8o', 'K4s', 'QTo', 'K3s', 'K7o', 'K2s', 'Q8s', 'K6o', 'J9s', 'K5o', 'Q9o', 'JTo', 'K4o', 'T9s', 'Q7s', 'Q6s', 'J8s', 'K3o', 'Q5s', 'K2o', 'Q8o', 'Q4s', 'Q3s', 'J9o', 'T8s', 'J7s', 'Q7o', 'Q2s', 'Q6o', '98s', 'Q5o', 'J8o', 'T9o', 'J6s', 'T7s', 'J5s', 'Q4o', 'J7o', 'J4s', 'Q3o', '97s', 'T8o', 'J3s', 'T6s', 'Q2o', '87s', 'J2s', 'J6o', '98o', '96s', 'T7o', 'J5o', 'T5s', 'T4s', '86s', 'J4o', 'T6o', '97o', 'T3s', '76s', '95s', 'J3o', 'T2s', '87o', '85s', '96o', 'T5o', '75s', 'J2o', '94s', '65s', 'T4o', '86o', '93s', '84s', '95o', 'T3o', '92s', '76o', '54s', '74s', 'T2o', '85o', '83s', '64s', '94o', '82s', '75o', '73s', '93o', '65o', '53s', '63s', '84o', '43s', '92o', '74o', '72s', '54o', '64o', '62s', '52s', '83o', '42s', '82o', '73o', '53o', '63o', '32s', '43o', '72o', '52o', '62o', '42o', '32o'];
		var ordenRock 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'JJ', 'TT', '99', 'AJs', '88', 'AJo', '77', '66', '55', 'KQs', 'KQo', 'ATs', 'KJs', '44', 'KJo', '33', 'A5s', 'A8s', 'QJs', 'A9s', 'QJo', 'JTs', 'KTs', 'JTo', 'A7s', 'KTo', 'A2s', 'K9s', 'ATo', 'T9s', 'J9s', 'A6s', 'A3s', 'A6o', 'QTs', 'J9o', '86s', 'A4s', 'A9o', '86o', 'QTo', '22', 'K4s', 'Q6s', 'T3s', '92s', '54s', 'Q8s', '92o', 'K4o', 'J3s', '98s', '74s', '43s', 'J8s', '87s', '65s', '54o', 'K2s', 'T8s', 'T9o', 'A3o', '87o', 'Q6o', 'T3o', 'A8o', 'A7o', 'A5o', 'A4o', 'A2o', 'K8s', 'K7s', 'K6s', 'K9o', 'Q9s', 'K5s', 'K8o', 'K3s', 'K7o', 'K6o', 'K5o', 'Q9o', 'Q7s', 'K3o', 'Q5s', 'K2o', 'Q8o', 'Q4s', 'Q3s', 'J7s', 'Q7o', 'Q2s', 'Q5o', 'J8o', 'J6s', 'T7s', 'J5s', 'Q4o', 'J7o', 'J4s', 'Q3o', '97s', 'T8o', 'T6s', 'Q2o', 'J2s', 'J6o', '98o', '96s', 'T7o', 'J5o', 'T5s', 'T4s', 'J4o', 'T6o', '97o', '76s', '95s', 'J3o', 'T2s', '85s', '96o', 'T5o', '75s', 'J2o', '94s', 'T4o', '93s', '84s', '95o', '76o', 'T2o', '85o', '83s', '64s', '94o', '82s', '75o', '73s', '93o', '65o', '53s', '63s', '84o', '74o', '72s', '64o', '62s', '52s', '83o', '42s', '82o', '73o', '53o', '63o', '32s', '43o', '72o', '52o', '62o', '42o', '32o'];
		var ordenMouse 		= ['AA', 'KK', 'AKs', 'QQ', 'JJ', 'TT', 'AQs', 'AQo', '99', 'ATs', 'AJs', 'KQs', 'ATo', 'AJo', '88', 'KQo', 'AKo', 'KJs', '77', 'QJs', 'KJo', 'JTs', 'T9s', 'A9s', 'T9o', 'QJo', 'JTo', 'A9o', '66', 'A8s', 'A8o', '55', 'A5s', 'J9s', 'A4s', 'J9o', 'QTs', 'KTs', 'A5o', '44', 'K8s', 'K8o', '33', 'A6s', 'QTo', '96s', 'K9s', '65s', 'Q8s', 'A7s', 'K5s', '22', 'K9o', 'Q8o', '96o', '65o', 'A6o', 'KTo', 'T7s', 'A3s', 'J2s', 'K6s', '97s', '98s', 'T8s', 'Q7s', 'K3s', '53s', 'K6o', 'A7o', 'Q5s', 'J2o', 'Q9s', 'Q2s', 'J7s', 'A3o', 'Q9o', 'A2s', 'T5s', '87s', '74s', 'K7s', '87o', 'T7o', '76s', 'Q7o', 'Q4s', 'Q2o', 'A4o', '95s', 'J8s', '97o', 'T8o', '76o', 'A2o', 'K7o', 'J7o', '98o', '74o', '84s', 'Q5o', 'T5o', 'Q3s', 'J6s', 'T6s', '54s', '63s', 'K4s', '86s', 'Q4o', '43s', '73s', 'J3s', 'Q3o', '64s', '93o', 'J8o', '43o', 'Q6s', 'K2s', '62s', '75s', 'J6o', '54o', 'T6o', '73o', 'J3o', '93s', '42s', 'K5o', 'K4o', 'K3o', 'K2o', 'Q6o', 'J5s', 'J4s', 'J5o', 'T4s', 'J4o', 'T3s', 'T2s', '85s', '94s', 'T4o', '86o', '95o', 'T3o', '92s', 'T2o', '85o', '83s', '94o', '82s', '75o', '84o', '92o', '72s', '64o', '52s', '83o', '82o', '53o', '63o', '32s', '72o', '52o', '62o', '42o', '32o'];
		var ordenMonkey 	= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'JJ', 'TT', 'ATs', 'ATo', 'KQs', 'KQo', 'KJs', 'KJo', '99', 'QJs', 'QJo', 'KTs', 'KTo', '88', '77', 'QTs', 'QTo', 'JTs', 'JTo', '66', '55', 'A9s', 'A9o', 'A8s', 'A8o', '44', 'A7s', 'A6s', 'A7o', 'K9s', 'A6o', 'K9o', 'A5s', '33', 'A5o', 'T9s', '22', 'A4s', 'T9o', 'A4o', 'A2s', 'J9s', 'A3s', 'J9o', 'Q9s', 'A3o', 'Q9o', 'K8s', '98s', 'T8s', 'A2o', 'K7s', '98o', 'J8s', 'K8o', 'J8o', '76s', '87s', '87o', 'K6s', 'Q8s', 'K7o', 'K5s', '65s', '54s', '75s', 'Q8o', '76o', 'Q7s', '97s', '97o', '65o', 'J7s', '86s', 'K4s', 'T6s', '96s', 'T8o', 'T7s', '43s', '86o', '64s', 'K6o', '96o', 'Q3s', '74s', '85s', 'Q4s', '54o', 'J4s', 'K3s', 'Q2s', 'Q5s', 'J6s', '53s', 'Q6s', '94s', 'K4o', 'K3o', 'K5o', 'Q7o', '75o', 'K2s', '95s', 'Q2o', 'T5s', 'J7o', 'K2o', '52s', 'T3s', 'Q6o', '63s', 'Q4o', 'Q5o', '84s', 'J6o', 'T6o', 'J4o', 'T7o', '43o', 'J2s', '53o', 'J5s', '85o', '92s', 'Q3o', '64o', '42s', '83s', '84o', '82s', 'T2s', 'J3s', '32s', 'T4s', '82o', '73s', '32o', '62s', 'J3o', '95o', 'J5o', '93s', '72s', 'J2o', '52o', '92o', 'T4o', '63o', '73o', 'T5o', '93o', 'T3o', '74o', '94o', '83o', 'T2o', '42o', '72o', '62o'];
		var ordenTelephone 	= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AJs', 'AJo', 'AQs', 'AQo', 'KQs', 'KQo', 'KJs', 'KJo', 'ATs', 'ATo', 'JJ', 'QJs', 'TT', 'QJo', 'A9s', 'A9o', 'KTs', 'KTo', 'QTs', 'QTo', '99', '88', '77', '66', 'A8s', 'A8o', 'JTs', 'JTo', '55', 'A7s', 'A7o', 'A5s', 'A5o', '44', 'A6s', 'A6o', 'T9s', '33', 'T9o', 'A4s', 'K9s', 'K9o', 'A4o', 'A2s', 'A2o', '22', 'A3s', 'A3o', 'Q9s', 'J9s', 'Q9o', 'J9o', '98s', '98o', '87s', '87o', 'K8s', 'J8s', 'K8o', 'J8o', 'Q8s', 'K7s', 'Q8o', 'T8s', 'T8o', 'K5s', 'K7o', '76s', '65s', '97s', '65o', 'K6s', '54s', '97o', 'J7s', 'J7o', 'K4s', '96s', 'K3s', 'Q7s', '86s', 'Q6s', 'T7s', 'Q6o', 'K6o', 'Q7o', '76o', 'K4o', '54o', '75s', 'T7o', 'K5o', 'T6s', '43s', '86o', 'Q4s', 'K2s', 'K2o', '96o', '64s', 'K3o', 'Q5s', 'Q5o', 'Q3s', '53s', 'Q2s', 'J6s', 'J6o', '75o', 'Q2o', 'J4s', 'Q4o', 'J2s', '95s', 'T5s', '43o', '85s', '32s', 'J5s', '64o', '84s', 'T6o', '74s', '53o', 'J4o', 'T2s', 'T3s', '74o', 'T4s', '83s', 'J3s', 'Q3o', '85o', '73s', '95o', '42s', '72s', '93s', 'J5o', '63s', '92s', 'T2o', '52s', '94s', '52o', 'J2o', '32o', '62s', '84o', 'T4o', 'T3o', '92o', '94o', '63o', 'T5o', '42o', '73o', 'J3o', '82s', '82o', '93o', '83o', '62o', '72o'];
		var ordenABC 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'JJ', 'TT', 'KQs', 'KQo', 'AJs', 'AJo', '99', '88', '77', '66', 'ATs', 'KJs', 'ATo', 'KJo', '55', '44', '33', '22', 'QJs', 'QJo', 'JTs', 'JTo', 'A9s', 'KTs', 'KTo', 'A2s', 'QTs', 'A8s', 'QTo', 'A9o', 'A8o', 'A6s', 'A6o', '87s', 'A7s', 'T9s', 'A7o', '76s', 'A5s', 'K9s', 'A4s', 'A3s', 'A3o', 'A4o', 'T8s', 'J9s', 'Q9s', '98s', '65s', 'T9o', '87o', 'K8s', 'K7s', '98o', 'Q9o', 'J8s', 'Q8s', 'J9o', '97s', 'A2o', 'K5s', '54s', 'J8o', 'A5o', 'Q8o', 'J6s', 'K9o', '86s', 'K6s', '32s', '32o', '43s', 'J2s', 'T5s', 'J7o', '42s', 'K8o', 'Q7s', 'K2s', '64s', 'T7s', '75s', 'J7s', '43o', 'K7o', 'Q4s', 'Q3s', '65o', 'T6s', 'Q3o', 'K5o', '76o', 'K4s', '97o', '83s', 'Q6s', 'Q7o', 'T8o', 'J3s', '72s', 'K4o', 'J3o', '94s', 'Q5o', 'Q5s', '63s', '85o', 'T5o', '95o', 'T6o', '62s', '52s', 'Q2s', '85s', 'J5s', '95s', 'T3o', '74s', '54o', 'K3s', 'T3s', 'K6o', 'J4s', 'K3o', 'K2o', 'Q6o', 'Q4o', 'Q2o', 'J6o', '96s', 'T7o', 'J5o', 'T4s', 'J4o', 'T2s', '96o', 'J2o', 'T4o', '86o', '93s', '84s', '92s', 'T2o', '94o', '82s', '75o', '73s', '93o', '53s', '84o', '92o', '74o', '64o', '83o', '82o', '73o', '53o', '63o', '72o', '52o', '62o', '42o'];
		var ordenLion 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'JJ', 'TT', '99', 'KQs', '88', 'KQo', '77', '66', 'AQs', '55', 'AQo', '44', '33', 'ATs', '22', 'ATo', 'AJs', 'A8s', 'AJo', 'KTs', 'J9s', 'QJs', 'JTs', 'JTo', 'QJo', 'A9s', 'KJs', 'A2s', 'KJo', 'A9o', 'K8s', 'A3s', 'A8o', 'A3o', 'T9s', 'K9s', 'QTs', 'K8o', 'T9o', 'A4s', 'Q9s', 'K7s', 'Q9o', 'K6s', 'A7o', 'A4o', 'T8o', 'Q7s', '96s', 'T8s', '43s', 'T7s', 'A5s', 'A7s', '98s', 'K5s', 'Q4s', 'Q2s', '87s', '65s', '32s', 'K2o', 'T6s', 'Q8o', 'Q4o', 'J8o', 'K9o', 'A5o', 'A2o', 'K7o', 'K2s', 'KTo', 'Q3s', '86s', 'J8s', 'J2s', 'Q8s', 'Q2o', 'J9o', '54s', 'Q5s', '76o', '87o', '65o', '98o', 'K4s', '76s', '63s', '86o', 'J7s', 'Q5o', '43o', '32o', 'A6s', 'A6o', 'QTo', 'K3s', 'K6o', 'K5o', 'K4o', 'Q6s', 'K3o', 'Q7o', 'Q6o', 'J6s', 'J5s', 'J7o', 'J4s', 'Q3o', '97s', 'J3s', 'J6o', 'T7o', 'J5o', 'T5s', 'T4s', 'J4o', 'T6o', '97o', 'T3s', '95s', 'J3o', 'T2s', '85s', '96o', 'T5o', '75s', 'J2o', '94s', 'T4o', '93s', '84s', '95o', 'T3o', '92s', '74s', 'T2o', '85o', '83s', '64s', '94o', '82s', '75o', '73s', '93o', '53s', '84o', '92o', '74o', '72s', '54o', '64o', '62s', '52s', '83o', '42s', '82o', '73o', '53o', '63o', '72o', '52o', '62o', '42o'];
		var ordenMan 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'JJ', 'KQs', 'KQo', 'TT', '99', 'ATs', 'ATo', '88', '77', 'KJs', 'KJo', '66', 'QJs', 'QJo', '55', '44', '33', 'JTs', 'KTs', 'KTo', 'JTo', '22', 'QTs', 'QTo', 'A9s', 'A9o', 'T9s', '98s', 'A8s', 'A4s', 'A8o', 'A5s', 'A2s', 'A7s', '87s', 'A3s', 'A6s', 'J9s', 'A7o', '76s', 'T8s', 'K9s', '65s', 'A5o', 'Q9s', 'T9o', 'A6o', '97s', 'J8s', 'A4o', 'K9o', 'A3o', 'J9o', 'Q9o', '54s', '86s', '98o', 'Q8s', 'K8s', 'A2o', 'K7s', '75s', '87o', 'K6s', 'T7s', 'K8o', '76o', 'K7o', '64s', 'Q7s', 'T8o', '43s', 'J7s', '97o', 'J8o', '96s', 'K4s', 'K3s', 'K5s', '85s', '65o', 'Q8o', 'K6o', 'K2s', 'Q6s', 'K5o', '95s', 'Q7o', '86o', 'T6s', '53s', '74s', '63s', 'Q5s', 'J7o', '42s', 'Q4s', 'J6s', '72s', 'Q3s', '54o', 'Q2s', '72o', 'Q6o', '75o', 'T7o', '32s', 'J4s', 'T6o', 'K2o', 'J3s', 'J5s', 'J2s', '84s', '96o', 'T4s', '52s', 'T2s', 'K4o', '73s', '62s', 'T3s', '82s', '64o', 'K3o', 'Q3o', 'T5s', '92s', 'Q5o', 'J2o', '42o', '83s', '94s', '93s', '43o', '63o', '93o', 'Q4o', 'J6o', 'J5o', 'J4o', '74o', '53o', 'T5o', 'T4o', '95o', '32o', '85o', '82o', '84o', 'J3o', 'Q2o', '52o', '92o', '94o', '83o', 'T3o', 'T2o', '73o', '62o'];
		var ordenWhale 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'JJ', 'TT', '99', 'ATs', 'ATo', '88', '77', 'KJs', 'KJo', '66', 'QJs', 'QJo', '55', '44', '33', 'A9s', 'A9o', 'JTs', 'JTo', '22', 'QTs', 'QTo', 'KTs', 'KTo', 'A8s', 'A8o', 'T9s', 'A5s', 'A7s', 'A6s', 'A3s', '98s', 'A4s', '87s', 'J9s', 'K9s', 'Q9s', '76s', 'T8s', 'A7o', 'A5o', '65s', 'A2s', 'T9o', 'A6o', 'A4o', '86s', 'A3o', 'K9o', 'J8s', 'Q8s', 'J9o', 'A2o', 'K8s', '97s', '54s', 'K7s', '98o', 'Q9o', '75s', 'K6s', '87o', '43s', 'K8o', 'T7s', 'K5s', '64s', '76o', 'T8o', 'J8o', 'K7o', 'K4s', 'Q8o', 'J7s', 'K2s', '65o', 'Q7s', '85s', 'K3s', '96s', '86o', '53s', '97o', 'Q7o', 'K6o', 'T7o', 'J6s', '32s', 'Q6s', '74s', 'J7o', 'T6s', 'K5o', 'J5s', '84s', 'Q5s', '54o', '42s', 'Q2s', 'Q2o', 'K3o', 'K2o', '75o', 'J4s', 'Q4o', 'Q6o', 'Q4s', 'T4s', '63s', 'T5s', 'K4o', '53o', 'Q3s', '95s', 'J5o', 'J6o', '64o', 'T5o', 'J3s', 'T2s', 'Q3o', '96o', 'J2s', '32o', 'Q5o', '84o', 'J2o', '85o', '73s', 'T2o', '42o', '94s', '83s', '63o', '52s', 'J4o', '82s', 'T3s', 'T6o', '83o', '93s', '43o', 'T4o', 'J3o', '93o', '73o', '72o', '72s', 'T3o', '74o', '94o', '92o', '95o', '92s', '62s', '52o', '82o', '62o'];
		var ordenEagle 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'JJ', 'TT', '99', 'ATs', 'ATo', '88', '77', 'KJs', 'KJo', '66', 'QJs', 'QJo', '55', '44', '33', '22', 'KTs', 'KTo', 'JTs', 'JTo', 'QTs', 'T9s', 'A9s', 'QTo', 'A9o', 'A5s', '98s', 'A7s', 'A2s', 'A8s', 'A4s', '76s', 'A3s', 'A8o', 'T8s', 'A6s', '87s', 'J9s', 'A5o', 'Q9s', 'A7o', 'T9o', 'A6o', 'K9s', 'K8s', 'K9o', '54s', '97s', '86s', '98o', '65s', '75s', 'A3o', 'A4o', 'K7s', 'J8s', 'Q8s', 'K8o', 'A2o', 'J9o', '43s', 'Q9o', '87o', 'K6s', 'T7s', '96s', '64s', 'K5s', 'J7s', 'K7o', '32s', 'Q7s', 'K4s', '76o', '65o', '97o', 'T8o', 'Q8o', 'K6o', 'T7o', 'J8o', 'K3s', '85s', '86o', '74s', 'J6s', '63s', 'K5o', 'Q4s', 'K2s', '54o', 'J4s', 'J7o', 'Q6s', 'Q3s', 'T6s', 'Q7o', '53s', 'J5s', '42s', 'K4o', 'K2o', 'Q5s', '52s', '84s', 'J5o', 'Q6o', 'T6o', 'T5s', '95s', '73s', 'K3o', 'T4s', 'J3s', 'Q2s', '96o', 'Q2o', 'Q5o', '53o', 'T2s', '75o', '94s', '74o', '62s', '64o', 'T3s', '62o', 'J2s', '85o', '52o', 'T4o', 'T2o', 'Q3o', 'J4o', '94o', 'J6o', '93o', 'J2o', '73o', 'T3o', '95o', '83s', '83o', '63o', '93s', 'J3o', '92s', '43o', '42o', '32o', 'Q4o', 'T5o', '82s', '84o', '92o', '72s', '82o', '72o'];
		var ordenCrow 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'ATs', 'ATo', 'JJ', 'KJs', 'KJo', 'TT', '99', '88', 'QJs', 'QJo', '77', '66', 'KTs', 'KTo', '55', 'JTs', 'JTo', 'QTs', 'QTo', 'A9s', 'A9o', '44', '33', 'A8s', 'A8o', '22', 'A7s', 'A7o', 'T9s', 'T9o', 'A5s', 'A5o', 'A6s', 'A6o', '98s', 'A2s', 'A3s', 'K9s', 'A4s', 'K9o', 'J9s', 'A4o', '87s', 'J9o', 'Q9s', 'Q9o', '76s', 'A3o', '98o', 'T8s', 'A2o', '97s', '65s', '86s', '87o', 'K8s', 'J8s', '54s', 'T8o', 'K7s', 'K8o', 'Q8s', '75s', '76o', 'K6s', 'T7s', '64s', 'Q8o', '65o', 'K4s', '43s', 'J8o', 'Q7s', '96s', 'K5s', '97o', 'K7o', '85s', 'J7s', 'K3s', 'T6s', 'K2s', '53s', 'T7o', 'Q6s', '86o', 'K6o', 'Q5s', '54o', 'Q7o', 'K5o', 'Q4s', '75o', 'K4o', '74s', 'Q3s', 'Q2s', 'J7o', '42s', '32s', '95s', '64o', 'J6s', 'Q5o', 'K3o', 'T5s', '43o', '96o', 'J3s', 'K2o', '52s', 'J2s', 'J5s', '63s', 'T6o', 'J4s', 'J6o', 'T4s', '62s', '94s', 'Q4o', '84s', 'Q6o', '32o', '85o', '73s', 'T3s', '53o', '95o', '92s', 'T5o', '74o', 'J2o', 'Q3o', 'Q2o', 'J4o', 'J5o', 'T2o', 'T2s', '83s', '72s', '42o', 'T4o', '52o', '82s', '73o', '63o', '84o', '62o', '93s', '83o', 'J3o', 'T3o', '94o', '93o', '82o', '92o', '72o'];
		var ordenABCFO 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AQs', 'AQo', 'AJs', 'AJo', 'KQs', 'KQo', 'ATs', 'ATo', 'JJ', 'KJs', 'KJo', 'TT', '99', 'QJs', 'QJo', '88', '77', 'JTs', 'JTo', 'A9s', 'A9o', 'KTs', 'KTo', '66', 'QTs', 'QTo', '55', 'A8s', 'A8o', '44', '33', 'A7s', 'A7o', '22', 'A5s', 'A5o', 'A6s', 'A6o', 'T9s', 'T9o', 'A4s', 'A4o', 'A3s', '98s', 'K9s', 'K9o', '76s', 'J9s', 'A2s', '87s', 'J9o', 'A3o', 'Q9s', 'A2o', 'T8s', 'Q9o', '98o', 'K8s', '65s', '97s', 'J8s', 'K7s', '87o', 'Q8s', '54s', '86s', 'K8o', 'J8o', 'T8o', '76o', '75s', 'K6s', 'T7s', '43s', '64s', 'Q8o', 'Q7s', '96s', '65o', 'K7o', 'J7s', 'K5s', 'Q6s', 'K4s', 'K3s', '97o', '85s', '86o', 'K6o', 'Q7o', '74s', '53s', 'K2s', 'Q5s', 'J7o', 'K5o', 'T7o', 'T6s', '54o', 'J6s', '63s', '32s', 'K4o', 'J5s', 'J4s', '95s', 'Q4s', '42s', '43o', '75o', 'J3s', 'K3o', 'T5s', 'Q3s', '84s', 'Q6o', '64o', '96o', 'Q5o', 'J2s', 'Q2s', 'T4s', 'T6o', '52s', '53o', '94s', 'K2o', '85o', 'Q4o', '62s', '73s', '93s', 'T2s', 'J4o', 'Q3o', '32o', '95o', 'J5o', '72s', 'T5o', '72o', 'T3s', 'Q2o', '92s', 'J6o', '52o', '82s', '63o', '84o', 'T4o', '94o', 'T3o', 'J2o', '42o', '83s', '73o', '83o', '92o', 'J3o', '74o', 'T2o', '93o', '82o', '62o'];
		var ordenDice 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AJs', 'AJo', 'AQs', 'AQo', 'ATs', 'ATo', 'KJs', 'QJs', 'KJo', 'QJo', 'KQs', 'JJ', 'KQo', 'TT', 'A9s', 'A9o', 'A8s', 'JTs', 'A8o', 'JTo', 'QTs', 'QTo', 'KTs', 'A5s', 'KTo', 'A5o', '99', '88', 'A7s', 'A7o', 'A6s', 'A6o', 'T9s', 'T9o', '77', 'J9s', 'J9o', '98s', '98o', 'A3s', 'A3o', 'A4s', 'A4o', 'K9s', 'K9o', '66', '55', 'Q9s', 'Q9o', '87s', '87o', 'A2s', 'A2o', '44', '33', '22', '97s', '97o', 'K8s', '76s', 'K8o', '76o', 'T8s', 'T8o', 'K7s', 'K7o', 'J8s', 'J8o', 'Q8s', 'Q8o', '65s', '65o', 'K5s', '96s', 'K5o', '96o', '86s', '86o', 'K6s', 'Q7s', '54s', 'K2s', 'K2o', '54o', 'Q7o', 'T7s', 'K6o', '64s', 'T7o', 'K3s', 'K3o', '75s', 'T6s', '53s', 'T6o', '75o', '64o', '95s', 'K4s', '43s', 'K4o', '43o', '85s', 'Q6s', 'Q6o', 'J7s', 'Q5s', 'Q4s', 'J6s', 'Q5o', 'Q4o', 'J5s', 'J5o', 'J6o', '74s', '85o', '95o', 'Q3s', 'Q3o', 'J7o', '63s', 'Q2s', 'Q2o', '84s', 'T3s', '63o', 'T4s', 'T2s', '94s', '42s', '42o', '52s', '52o', 'J3s', '32s', 'J4s', '53o', 'T5s', 'J4o', 'T5o', '32o', '62s', '83s', '84o', '62o', '74o', 'T3o', '73s', '73o', '92s', '82s', '82o', 'J2s', 'J2o', 'J3o', '93s', 'T2o', 'T4o', '72s', '94o', '72o', '83o', '92o', '93o'];
		var ordenFish 		= ['AA', 'KK', 'AKs', 'QQ', 'AKo', 'AJs', 'AJo', 'AQs', 'AQo', 'KQs', 'KQo', 'ATs', 'ATo', 'KJs', 'KJo', 'KTs', 'KTo', 'A9s', 'A9o', 'JTs', 'JTo', 'QJs', 'QJo', 'QTs', 'QTo', 'A8s', 'A8o', 'JJ', 'TT', '99', 'A7s', 'A7o', 'A6s', 'A6o', 'A5s', 'A5o', 'Q9s', 'Q9o', 'T9s', '88', 'T9o', '77', 'K9s', 'K9o', 'A4s', 'A4o', '66', 'A3s', 'A3o', 'J9s', 'J9o', '98s', '98o', '55', 'A2s', 'A2o', '44', '33', '87s', '87o', 'K8s', 'K8o', '22', 'T8s', 'T8o', 'Q8s', 'Q8o', 'J8s', 'J8o', '76s', '76o', 'K7s', 'K7o', 'K6s', 'K6o', '65s', '65o', '97s', '97o', '86s', '86o', 'K5s', '54s', '54o', 'K5o', 'Q7s', 'Q7o', 'T7s', 'T7o', 'J7s', 'J7o', 'K4s', 'K4o', 'Q6s', '75s', '75o', '96s', '64s', 'K3s', 'K3o', 'Q6o', 'Q5s', 'K2s', 'K2o', 'J4s', '96o', 'Q5o', 'J5s', '85s', '85o', '64o', '95s', 'J6s', 'T6s', '43s', '43o', 'Q4s', 'J6o', '53o', '53s', 'J3s', '74s', 'J2s', 'Q3s', '32s', '32o', '52s', 'J5o', '42s', 'Q4o', 'T5s', 'Q2s', 'T6o', '84s', 'T3s', 'T4s', '63s', 'Q2o', 'Q3o', '94s', 'J2o', 'J4o', 'T2s', 'J3o', '73s', '84o', '93s', '74o', '63o', '83s', '95o', '72s', 'T5o', '42o', '52o', '62s', '73o', '92s', 'T2o', 'T4o', '94o', '93o', '82s', 'T3o', '83o', '62o', '72o', '92o', '82o'];

	 	var arraySlide = getArrayType(vm.tipoPlayer);
		console.log('se calculo', arraySlide);

	 	$scope.$on('slideEnded', function() {
	 		updateButtons();
	 	});

		// camibia el estado del button
		function shuffleButton(element, card){
			vm.basado = 'custom';
			if (element.attr('class').indexOf('danger') > -1) {
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

			if (element.attr('class').indexOf('danger') > -1) {
				if(!activa){
					desactivaButton(element, card);
				}
			}else{
				if(activa){
					activaButton(element, card);
				}
			}
		}

		function activaButton(element, card){
			console.log('agrega:', card);
			element.attr('class', 'btn btn-danger btn-xs');
		}

		function desactivaButton(element, card){
			console.log('borra:', card);
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
	}

// });
