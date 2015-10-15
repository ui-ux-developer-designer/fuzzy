(function () {
	'use strict';

	angular
		.module('books')
		.service('bookService', ['$http', BookService]);

	function BookService($http) {
		return {
			loadAllBooks: function () {
				return $http.get('src/books/books.xml', {
					transformResponse: function (data) {
						var x2js = new X2JS();
						var json = x2js.xml_str2json(data);
						return json.catalog.book;
					}
				});
			}
		};
	}

})();