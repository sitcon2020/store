App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    $.getJSON('../models.json', function(data) {
      var petsRow = $('#modelRow');
      var petTemplate = $('#modelTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].name);
        petTemplate.find('img').attr('src', data[i].picture);
        petTemplate.find('.model-type').text(data[i].breed);
        petTemplate.find('.btn-reserve').attr('data-id', data[i].id);
        petsRow.append(petTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('https://sandbox.truffleteams.com/69a8e39c-caaf-4f4d-9c1e-15f91de9c3a7ddd');
    }
    
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Reserve.json', function(data) {
      var AdoptionArtifact = data;
      App.contracts.Reserve = TruffleContract(AdoptionArtifact);

      App.contracts.Reserve.setProvider(App.web3Provider);

      return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-reserve', App.handleAdopt);
  },

  markAdopted: function(reserves, account) {
    var adoptionInstance;

    App.contracts.Reserve.deployed().then(function(instance) {
      adoptionInstance = instance;

      return adoptionInstance.getReserves.call();
    }).then(function(reserves) {
      for (i = 0; i < reserves.length; i++) {
        if (reserves[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var modelId = parseInt($(event.target).data('id'));
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.Reserve.deployed().then(function(instance) {
        adoptionInstance = instance;

        return adoptionInstance.reserve(modelId, {from: account});
      }).then(function(result) {
        return App.markAdopted();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
