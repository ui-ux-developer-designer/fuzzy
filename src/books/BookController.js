/* global $scope */
/* global Fuse */
/* global angular */
/* global X2JS */

(function () {

	angular
		.module('books')
		.filter('search', function () {
			return function (books, keyword) {
				var options = {
					keys: ['title']
				}
				var f = new Fuse(books, options);
				if (keyword === undefined || keyword === null || keyword === '') {
					return books;
				} else {
					return f.search(keyword);
				}
			};
		})
		.filter('highlight', function ($sce) {
			return function (text, keyword) {
				if (keyword) text = text.replace(new RegExp('(' + keyword + ')', 'gi'),
					'<span class="highlighted">$1</span>')
				return $sce.trustAsHtml(text)
			}
		})
		.controller('BookController', [
			'bookService', '$mdSidenav', '$mdBottomSheet', '$log', '$q', 'searchFilter', '$sce', '$timeout',
			BookController
		]);

	function BookController(bookService, $mdSidenav, $mdBottomSheet, $log, $q, searchFilter, $sce, $timeout) {
		var self = this;

		self.selected = null;
		self.books = [];
		self.selectBook = selectBook;
		self.toggleList = toggleBooksList;
		self.showShopOptions = showShopOptions;
		self.determinateValue = 'indeterminate';

		bookService
			.loadAllBooks(self)
			.success(function (books) {
				$timeout(function () {
					self.determinateValue = '';
				}, 1000);
				self.books = books;
				self.selected = books[0];
			});

		function toggleBooksList() {
			var pending = $mdBottomSheet.hide() || $q.when(true);

			pending.then(function () {
				$mdSidenav('left').toggle();
			});
		}

		function selectBook(book) {
			self.selected = angular.isNumber(book) ? $scope.books[book] : book;
			self.toggleList();
		}

		function showShopOptions($event) {
			var book = self.selected;

			return $mdBottomSheet.show({
				parent: angular.element(document.getElementById('content')),
				templateUrl: './src/books/view/shopSheet.html',
				controller: ['$mdBottomSheet', ShopPanelController],
				controllerAs: "cp",
				bindToController: true,
				targetEvent: $event
			}).then(function (clickedItem) {
				clickedItem && $log.debug(clickedItem.name + ' clicked!');
			});

			function ShopPanelController($mdBottomSheet) {
				this.book = book;
				this.actions = [
					{ name: 'Google', icon: 'googlr', icon_url: 'assets/svg/google.svg' },
					{ name: 'Ebay', icon: 'ebay', icon_url: 'assets/svg/ebay.svg' },
					{ name: 'Amazon', icon: 'amazon', icon_url: 'assets/svg/amazon.svg' },
					{ name: 'W3', icon: 'w3', icon_url: 'assets/svg/w3.svg' }
				];
				this.submitShop = function (action) {
					$mdBottomSheet.hide(action);
				};
			}
		}

	}

})();
