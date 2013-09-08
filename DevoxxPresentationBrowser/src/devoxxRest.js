angular.module('devoxx', [ 'ui.bootstrap' ]);

function LoadCtrl($scope, $http, $templateCache) {
	$scope.currentPresentation = null;

	$scope.loadData = function() {
		$scope.code = null;
		$scope.response = null;

		$http({
			method : 'GET',
			url : 'https://cfp.devoxx.com/rest/v1/events/10/presentations',
			cache : $templateCache
		}).success(function(data, status) {
			$scope.status = status;
			$scope.presentations = data;
		}).error(function(data, status) {
			alert("failure: " + status)
			$scope.presentations = data || "Request failed";
			$scope.status = status;
		});
	};

	$scope.showTags = function(presentation) {
		var result = "";
		angular.forEach(presentation.tags, function(tag) {
			result += tag.name + ", ";
		});
		return result;
	};

	$scope.openDialog = function(presentation) {
		$scope.shouldBeOpen = true;
		$scope.currentPresentation = presentation;
	};

	$scope.closeDialog = function() {
		$scope.closeMsg = 'I was closed at: ' + new Date();
		$scope.shouldBeOpen = false;
		$scope.currentPresentation = null;
	};

	$scope.dialogTitle = function() {
		return $scope.currentPresentation.title;
	};
	$scope.dialogContent = function() {
		return $scope.currentPresentation.summary;
	};
	$scope.dialogDescription = function() {
		return "Type: " + $scope.currentPresentation.type + " - Experience: "
				+ $scope.currentPresentation.experience;
	};
	$scope.dialogSpeaker = function() {
		var result = "Speaker: ";
		angular.forEach($scope.currentPresentation.speakers, function(speaker) {
			result += speaker.speaker + ", ";
		});
		return result;
	};

	$scope.opts = {
		backdropFade : true,
		dialogFade : true
	};

}