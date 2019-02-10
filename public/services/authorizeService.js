boardApp.factory('authorizeService', function ($http, $window) {
    return {
        checkAuth: (jwt) => {
            return $http({
                method: 'POST',
                url: '/api/v1/authorize',
                data: { token: jwt },
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            });
        }
    }
});