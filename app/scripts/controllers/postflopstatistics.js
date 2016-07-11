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
	 	vm.basado = 'default';
	 	vm.shuffleButton = shuffleButton;
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

	 	$scope.$on('slideEnded', function() {
	 		updateButtons(vm.slider.min, vm.slider.max);
	 	});

		// camibia el estado del button
		function shuffleButton(element, card){
			if (element.attr('class').indexOf('danger') > -1) {
				desactivaButton(element, card);
			}else{
				activaButton(element, card);
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

		var porcentageDefault = [
		 	'AA', 'KK', 'AKs', 'QQ', 'AKo', 'JJ', 'AQs', 'TT', 'AQo', '99', 'AJs', '88', 'ATs',
		 	'AJo', '77', '66', 'ATo', 'A9s', '55', 'A8s', 'KQs', '44', 'A9o', 'A7s', 'KJs', 'A5s',
		 	'A8o', 'A6s', '33', 'A4s', 'KTs', 'A3s', 'A7o', 'KQo', 'A2s', 'A5o', 'A6o', 'A4o', 'KJo',
		 	'QJs', '22', 'A3o', 'K9s', 'A2o', 'QTs', 'KTo', 'K8s', 'K7s', 'JTs', 'K6s', 'K9o',
		 	'QJo', 'Q9s', 'K5s', 'K8o', 'K4s', 'QTo', 'K3s', 'K7o', 'K2s', 'Q8s', 'K6o', 'J9s',
		 	'K5o', 'Q9o', 'JTo', 'K4o', 'T9s', 'Q7s', 'Q6s', 'J8s', 'K3o', 'Q5s', 'K2o',
		 	'Q8o', 'Q4s', 'Q3s', 'J9o', 'T8s', 'J7s', 'Q7o', 'Q2s', 'Q6o',
		 	'98s', 'Q5o', 'J8o', 'T9o', 'J6s', 'T7s', 'J5s', 'Q4o', 'J7o', 'J4s', 'Q3o', '97s',
		 	'T8o', 'J3s', 'T6s', 'Q2o', '87s', 'J2s', 'J6o', '98o', '96s', 'T7o', 'J5o', 'T5s',
		 	'T4s', '86s', 'J4o', 'T6o', '97o', 'T3s', '76s', '95s', 'J3o', 'T2s', '87o', '85s', '96o', 'T5o',
		 	'75s', 'J2o', '94s', '65s', 'T4o', '86o', '93s', '84s', '95o', 'T3o', '92s', '76o',
		 	'54s', '74s', 'T2o', '85o', '83s', '64s', '94o', '82s', '75o', '73s', '93o', '65o', '53s',
		 	'63s', '84o', '43s', '92o', '74o', '72s', '54o', '64o', '62s', '52s', '83o', '42s',
		 	'82o', '73o', '53o', '63o', '32s', '43o', '72o', '52o', '62o', '42o', '32o'
		];

		function updateButtons(sliderMin, sliderMax) {

			if(sliderMin === sliderMax){
				porcentageDefault.forEach(function(el){
					handlerCard(el, false);
				});
				return;
			}

			// the slider accept max < min
			var min = sliderMin < sliderMax ? sliderMin : sliderMax;
			var max = sliderMax > sliderMin ? sliderMax : sliderMin;

			var count = 0.0;

			porcentageDefault.forEach(function(el){
				var previo = count;
				var valueCard = el.length === 2 ? 0.085 : el.indexOf('s') > -1 ?  0.3238 : 0.944;
				count += valueCard;
				// console.log('element', i, count);
				var pasaMin = (count >= min) && (count - min > valueCard / 2);
				var pasaMax = (count <= max) || ((count > max) && (count - max) < (max - previo));
				handlerCard(el, pasaMin && pasaMax);
			});
		}

	}

// });
