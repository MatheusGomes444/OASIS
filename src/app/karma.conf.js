module.exports = function(config) {
    config.set({
      // outras configurações do Karma...
      browsers: ['ChromeHeadless'],
      singleRun: true, // Garante que os testes rodem uma única vez no ambiente CI
      // outras configurações...
      browserNoActivityTimeout: 30000, // Define o tempo limite de espera para 30 segundos
      singleRun: true, // Faz com que os testes sejam executados apenas uma vez

    });

  };
