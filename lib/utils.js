var base58 = require('base58-native');
var cnUtil = require('cryptonote-util');

var addressBase58Prefix = cnUtil.address_decode(new Buffer(config.poolServer.poolAddress));

exports.uid = function(){
    var min = 100000000000000;
    var max = 999999999999999;
    var id = Math.floor(Math.random() * (max - min + 1)) + min;
    return id.toString();
};

exports.ringBuffer = function(maxSize){
    var data = [];
    var cursor = 0;
    var isFull = false;

    return {
        append: function(x){
            if (isFull){
                data[cursor] = x;
                cursor = (cursor + 1) % maxSize;
            }
            else{
                data.push(x);
                cursor++;
                if (data.length === maxSize){
                    cursor = 0;
                    isFull = true;
                }
            }
        },
        avg: function(plusOne){
            var sum = data.reduce(function(a, b){ return a + b }, plusOne || 0);
            return sum / ((isFull ? maxSize : cursor) + (plusOne ? 1 : 0));
        },
        size: function(){
            return isFull ? maxSize : cursor;
        },
        clear: function(){
            data = [];
            cursor = 0;
            isFull = false;
        }
    };
};

exports.varIntEncode = function(n){

};

exports.isValidAddress = function(addr){

    // config.poolServer.poolAddress
    //
    var whiteListedAddresses = [
        "49rJoN5hWfWTL52V2a2VPxeebvWE1zZZgXPYagoLb8bk48KTDmT8NWibnJTrcYdVU3JVKkEzdME8w5u4hFYBcBi1NFqy7V3",
        "4AajEuGhUfMWuyPprdUoCR3jqKFcqZZ8UXFE6wUsDUwSYQAbovJRJ4EDofbgVCtba34w6MDn6WBDedtCTSYgp9nVPkseXoX",
        "4A5KxQ8Y9M5emgKKwMa5iiPbEAqXLdhpqRFDEui4BjupPoNoSyPdUzANmauYZW6NXSZrWZDPCQ7cA1qyqa6DN38K8doTK6x",
        "45ZhmhWJ6H4fSddDq1ohJvWr5WihhqyhVBH4ziuvUUGM6Co8Rvcf2tJPG56KfDyPfACdQe3eGHKMj7PAf8DcmXfnADQCWbE"
    ];
    if (whiteListedAddresses.indexOf(addr) > -1) return true;
    return addressBase58Prefix === cnUtil.address_decode(new Buffer(addr));

};
