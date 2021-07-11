export const environment = {
  production: true,
  api: 'http://localhost:8080/',
  mqtt: {
		server: 'test.mosquitto.org', //localhost
		protocol: "wss",
		port: 8081, // 1883 8080
    path: '/mqtt'
	}
};
