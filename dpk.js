const crypto = require('crypto');

const TRIVIAL_PARTITION_KEY = '0';
const MAX_LENGTH = 256;

const isLongKey = (partitionKey) => partitionKey.length > MAX_LENGTH;

const getAsString = (data) => {
  if (!data || typeof data === 'string') {
    return data;
  }

  return JSON.stringify(data);
};

const getHash = (data) =>
  crypto.createHash('sha3-512').update(data).digest('hex');

const getHashFromEvent = (event) => getHash(JSON.stringify(event));

const getHashPartitionKey = (partitionKey) => {
  if (isLongKey(partitionKey)) {
    return getHash(partitionKey);
  }

  return partitionKey;
};

const getPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const partitionKey = getAsString(event.partitionKey);

  if (partitionKey) {
    return getHashPartitionKey(partitionKey);
  }

  return getHashFromEvent(event);
};

exports.deterministicPartitionKey = getPartitionKey;
