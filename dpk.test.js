const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey function', () => {
  const trivialPartitionKey = '0';

  describe('event is undefined', () => {
    it('Returns the trivialPartitionKey when given no event', () => {
      const partitionKey = deterministicPartitionKey();
      expect(partitionKey).toBe(trivialPartitionKey);
    });

    it('Returns the trivialPartitionKey when event is undefined', () => {
      const partitionKey = deterministicPartitionKey(undefined);
      expect(partitionKey).toBe(trivialPartitionKey);
    });
  });

  describe('event is null', () => {
    it('Returns the trivialPartitionKey when event is null', () => {
      const partitionKey = deterministicPartitionKey();
      expect(partitionKey).toBe(trivialPartitionKey);
    });
  });

  describe('event is boolean', () => {
    it('Returns the trivialPartitionKey when event is false', () => {
      const partitionKey = deterministicPartitionKey(false);
      expect(partitionKey).toBe(trivialPartitionKey);
    });

    it('Returns the generated key when event is true', () => {
      const partitionKey = deterministicPartitionKey(true);
      expect(partitionKey).toBe(
        'ff2c82ed266dc30b1afe862bee32cf996b213513bc6b3e242ff605ddd9d5bbd1e7eebf6dde586b8700125cb7b95d35aec2f4e750d092cd359b202e3d2be41e1a'
      );
    });
  });

  describe('event is number', () => {
    it('Returns the trivialPartitionKey when event is 0', () => {
      const partitionKey = deterministicPartitionKey(0);
      expect(partitionKey).toBe(trivialPartitionKey);
    });

    it('Returns the generated key when event is a positive number', () => {
      const partitionKey = deterministicPartitionKey(2);
      expect(partitionKey).toBe(
        '564e1971233e098c26d412f2d4e652742355e616fed8ba88fc9750f869aac1c29cb944175c374a7b6769989aa7a4216198ee12f53bf7827850dfe28540587a97'
      );
    });

    it('Returns the generated key when event is a negative number', () => {
      const partitionKey = deterministicPartitionKey(-2);
      expect(partitionKey).toBe(
        '4fc921e0a156f4187a3ca6febd79a37e4183332b0d31442f96e73b005e8f2676d9f1487dfa5caed014a479166205532c96ba28a93b6c157cabe862fe1ee2cab2'
      );
    });

    it('Returns the generated key when event is big int', () => {
      const partitionKey =
        deterministicPartitionKey(
          546654654654564654564654646546545332131231546546545432123123121654544
        );

      expect(partitionKey).toBe(
        '085d2802379eee6cc3a51fd06b311e2c94be55678ad060e446bd55ae98be2479b7d93ded051d3f994da19ad5d4f2fa9899e1d23a4c93c7c279927a83f21c154b'
      );
    });
  });

  describe('event is string', () => {
    it('Returns the trivialPartitionKey when event is an empty string', () => {
      const partitionKey = deterministicPartitionKey('');
      expect(partitionKey).toBe(trivialPartitionKey);
    });

    it('Returns the trivialPartitionKey when event is an string with spaces', () => {
      const partitionKey = deterministicPartitionKey('   ');
      expect(partitionKey).toBe(
        'bfbb226e34d542b6ec7ba02a8576a73dd63157cfccc397a5695db49dd2685ffb887dbad2db1ac59606f32b98e7b88bb5e5d069a94dd294c0b84eb7cf0db690a6'
      );
    });

    it('Returns the generated key when event length is less than 256', () => {
      const partitionKey = deterministicPartitionKey('short string');
      expect(partitionKey).toBe(
        '3570a616571bee9f2c7b91e92aea50da02fdeb0323399a056cac32bd7f77d5172cee8eb4134d76fbffc9b150fc033c249811739bd89c9295dd1cb026cc777907'
      );
    });

    it('Returns the generated key when event length is greater than 256', () => {
      const partitionKey = deterministicPartitionKey(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Scelerisque eu ultrices vitae auctor eu augue ut. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Aliquam ut porttitor leo a diam sollicitudin tempor id. Sit amet justo donec enim diam vulputate ut. Aliquet bibendum enim facilisis gravida. Accumsan tortor posuere ac ut consequat semper viverra nam. Fringilla est ullamcorper eget nulla. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Nibh ipsum consequat nisl vel pretium lectus quam. Turpis nunc eget lorem dolor. Duis ultricies lacus sed turpis tincidunt id. Facilisis volutpat est velit egestas. Leo urna molestie at elementum eu facilisis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus commodo viverra maecenas. Volutpat odio facilisis mauris sit amet massa vitae tortor. Ultrices sagittis orci a scelerisque purus semper eget duis. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. A cras semper auctor neque. Est pellentesque elit ullamcorper dignissim.'
      );
      expect(partitionKey).toBe(
        '9594e6447ab242d4d4e4e5dcd418c34339f15c0445f9788a8994cbf2bb8400616343ec27c9c286c9e3c6b3894d41fbee4bf5e39d4b3369d80464b918f3b2b3db'
      );
    });

    it('Returns the generated key when event contains special characters', () => {
      const partitionKey = deterministicPartitionKey(
        'Ȁ\tȐ\tȑ\tȒ\tȓ\tȔ\tȕ\tȖ\tȗ\tȘ\tș\tȚ\tț\tȜ\tȝ\tȞ\tȟ\nʯ'
      );
      expect(partitionKey).toBe(
        '73583275497ce9e64e128b6912e942adf752c56e0de68a1feee6a36891bdade7c94f3f5941aa442f501aa2df840a85cd3185924fe6491dbe8fe794ff1fb7d8e2'
      );
    });
  });

  describe('event is array', () => {
    it('Returns the generated key when event is an empty array', () => {
      const partitionKey = deterministicPartitionKey([]);
      expect(partitionKey).toBe(
        '888b858b73d5d34fedab0f07663436931a95c73d6d7808edc868767bb9172f9e542fb7bb1ad1dbe988ceff0aaffde2012bc0e7d1914e986269f46d93651436a5'
      );
    });

    it('Returns the generated key when event is an array of strings', () => {
      const partitionKey = deterministicPartitionKey(['a', 'b', 'c']);
      expect(partitionKey).toBe(
        '903d643f1a302ef54000c7c6e40d37404e0c1a483fe2ea2abcf425d20f11c971f1e5b50f8ed43c54dac088acf8e2b88c2d1dce2ee36469aa032691aa92153b58'
      );
    });
  });

  describe('event is object', () => {
    describe('event doesnt have the partition key', () => {
      it('Returns the generated key when stringify event version length is less than 256', () => {
        const partitionKey = deterministicPartitionKey({ key: 'value' });
        expect(partitionKey).toBe(
          '163696cd46674b4fdd7dce65027cc78ad9347884c556d18b814d9c53dff854c92ad25d0eb2c58c279d04215a57772236a679839092d342c41c2563fad5256ee2'
        );
      });

      it('Returns the generated key when stringify event version length is greater than 256', () => {
        const partitionKey = deterministicPartitionKey({
          key: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Scelerisque eu ultrices vitae auctor eu augue ut. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Aliquam ut porttitor leo a diam sollicitudin tempor id. Sit amet justo donec enim diam vulputate ut. Aliquet bibendum enim facilisis gravida. Accumsan tortor posuere ac ut consequat semper viverra nam. Fringilla est ullamcorper eget nulla. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Nibh ipsum consequat nisl vel pretium lectus quam. Turpis nunc eget lorem dolor. Duis ultricies lacus sed turpis tincidunt id. Facilisis volutpat est velit egestas. Leo urna molestie at elementum eu facilisis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus commodo viverra maecenas. Volutpat odio facilisis mauris sit amet massa vitae tortor. Ultrices sagittis orci a scelerisque purus semper eget duis. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. A cras semper auctor neque. Est pellentesque elit ullamcorper dignissim.',
        });
        expect(partitionKey).toBe(
          '1a77af3c98026e1cbd73fc5c74e59534d044a0200cc2c1c3bdc910bee1ed444be75172324b39b04ec6a285ff01c8f5a2a4a872b9a6005df9e936e1cda34b8d91'
        );
      });
    });

    describe('event does have the partition key', () => {
      describe('partition key is undefined', () => {
        it('Returns the generated key when partition key is undefined', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: undefined,
          });
          expect(partitionKey).toBe(
            'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862'
          );
        });
      });

      describe('partition key is null', () => {
        it('Returns the generated key when partition key is null', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: null,
          });
          expect(partitionKey).toBe(
            '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2'
          );
        });
      });

      describe('partition key is boolean', () => {
        it('Returns the trivialPartitionKey when partition key is false', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: false,
          });
          expect(partitionKey).toBe(
            '51a5f43b933ce152103a4789a17f1cf958e0b5e1c793082db6a6c74dd3f04c69ad8f558e28cf7c3eac61af4e484741f095129e815c4de4fdd30e3cd6c4e3c00f'
          );
        });

        it("Returns 'true' key when event is true", () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: true,
          });
          expect(partitionKey).toBe('true');
        });
      });

      describe('partition key is number', () => {
        it('Returns the generated key when partition key is 0', () => {
          const partitionKey = deterministicPartitionKey({ partitionKey: 0 });
          expect(partitionKey).toBe(
            'e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7'
          );
        });

        it('Returns the positive number as string key when partition key is a positive number', () => {
          const partitionKey = deterministicPartitionKey({ partitionKey: 2 });
          expect(partitionKey).toBe('2');
        });

        it('Returns the negative number as string when partition key is a negative number', () => {
          const partitionKey = deterministicPartitionKey({ partitionKey: -2 });
          expect(partitionKey).toBe('-2');
        });

        it('Returns the stringify number when partition key is big int', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: 546654654654564654564654646546545332131231546546545432123123121654544,
          });

          expect(partitionKey).toBe('5.466546546545647e+68');
        });
      });

      describe('partition key is string', () => {
        it('Returns the generated key when partition key is an empty string', () => {
          const partitionKey = deterministicPartitionKey({ partitionKey: '' });
          expect(partitionKey).toBe(
            'b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6'
          );
        });

        it('Returns the input partition key when partition key is an string with spaces', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: '   ',
          });
          expect(partitionKey).toBe('   ');
        });

        it('Returns the input partition key when partition key length is less than 256', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: 'short string',
          });
          expect(partitionKey).toBe('short string');
        });

        it('Returns the generated key when partition key length is greater than 256', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Scelerisque eu ultrices vitae auctor eu augue ut. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Aliquam ut porttitor leo a diam sollicitudin tempor id. Sit amet justo donec enim diam vulputate ut. Aliquet bibendum enim facilisis gravida. Accumsan tortor posuere ac ut consequat semper viverra nam. Fringilla est ullamcorper eget nulla. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Nibh ipsum consequat nisl vel pretium lectus quam. Turpis nunc eget lorem dolor. Duis ultricies lacus sed turpis tincidunt id. Facilisis volutpat est velit egestas. Leo urna molestie at elementum eu facilisis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus commodo viverra maecenas. Volutpat odio facilisis mauris sit amet massa vitae tortor. Ultrices sagittis orci a scelerisque purus semper eget duis. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. A cras semper auctor neque. Est pellentesque elit ullamcorper dignissim.',
          });
          expect(partitionKey).toBe(
            '205521711df8732f7dcfd0f364df8c02b9f40c01ad759b069c57c9fb6c3b8824a24726455024e25e04c39eb0ad4cebfe51cf4d064865702213dbabb81bccc647'
          );
        });

        it('Returns the input partition key when partition key contains special characters', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey:
              'Ȁ\tȐ\tȑ\tȒ\tȓ\tȔ\tȕ\tȖ\tȗ\tȘ\tș\tȚ\tț\tȜ\tȝ\tȞ\tȟ\nʯ',
          });
          expect(partitionKey).toBe(
            'Ȁ\tȐ\tȑ\tȒ\tȓ\tȔ\tȕ\tȖ\tȗ\tȘ\tș\tȚ\tț\tȜ\tȝ\tȞ\tȟ\nʯ'
          );
        });
      });

      describe('partition key is an object', () => {
        it('Returns {} when partitionKey is as an empty object', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: {},
          });
          expect(partitionKey).toBe('{}');
        });

        it('Returns object as string when partitionKey property as an small object', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: { key: 'value' },
          });
          expect(partitionKey).toBe('{"key":"value"}');
        });

        it('Returns the generated key when partitionKey is a big object', () => {
          const partitionKey = deterministicPartitionKey({
            property: 'test',
            partitionKey: {
              property:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Scelerisque eu ultrices vitae auctor eu augue ut. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Aliquam ut porttitor leo a diam sollicitudin tempor id. Sit amet justo donec enim diam vulputate ut. Aliquet bibendum enim facilisis gravida. Accumsan tortor posuere ac ut consequat semper viverra nam. Fringilla est ullamcorper eget nulla. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Nibh ipsum consequat nisl vel pretium lectus quam. Turpis nunc eget lorem dolor. Duis ultricies lacus sed turpis tincidunt id. Facilisis volutpat est velit egestas. Leo urna molestie at elementum eu facilisis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus commodo viverra maecenas. Volutpat odio facilisis mauris sit amet massa vitae tortor. Ultrices sagittis orci a scelerisque purus semper eget duis. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. A cras semper auctor neque. Est pellentesque elit ullamcorper dignissim.',
            },
          });
          expect(partitionKey).toBe(
            'd535fb885ea0255035a55ca8cea85bec9782306b30725e744027b1254699fa633c5f5aae2c141ce6658ffec201b77ac8ac472d834b2eb119012bf66f6a3a6571'
          );
        });
      });

      describe('partition key is an array', () => {
        it('Returns the array as string when partitionKey property as an empty array', () => {
          const partitionKey = deterministicPartitionKey({
            partitionKey: [],
          });
          expect(partitionKey).toBe('[]');
        });

        it('Returns the array as string when partitionKey is an short array', () => {
          const event = {
            partitionKey: [1, 2, 3, 4, 5],
          };
          const partitionKey = deterministicPartitionKey(event);
          const expected = '[1,2,3,4,5]';

          expect(partitionKey).toBe(expected);
        });

        it('Returns generated key when partition key is a long array', () => {
          const partitionKey = deterministicPartitionKey({
            property: 'test',
            partitionKey: [
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Scelerisque eu ultrices vitae auctor eu augue ut. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Aliquam ut porttitor leo a diam sollicitudin tempor id. Sit amet justo donec enim diam vulputate ut. Aliquet bibendum enim facilisis gravida. Accumsan tortor posuere ac ut consequat semper viverra nam. Fringilla est ullamcorper eget nulla. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Nibh ipsum consequat nisl vel pretium lectus quam. Turpis nunc eget lorem dolor. Duis ultricies lacus sed turpis tincidunt id. Facilisis volutpat est velit egestas. Leo urna molestie at elementum eu facilisis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus commodo viverra maecenas. Volutpat odio facilisis mauris sit amet massa vitae tortor. Ultrices sagittis orci a scelerisque purus semper eget duis. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. A cras semper auctor neque. Est pellentesque elit ullamcorper dignissim.',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Scelerisque eu ultrices vitae auctor eu augue ut. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Aliquam ut porttitor leo a diam sollicitudin tempor id. Sit amet justo donec enim diam vulputate ut. Aliquet bibendum enim facilisis gravida. Accumsan tortor posuere ac ut consequat semper viverra nam. Fringilla est ullamcorper eget nulla. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Nibh ipsum consequat nisl vel pretium lectus quam. Turpis nunc eget lorem dolor. Duis ultricies lacus sed turpis tincidunt id. Facilisis volutpat est velit egestas. Leo urna molestie at elementum eu facilisis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus commodo viverra maecenas. Volutpat odio facilisis mauris sit amet massa vitae tortor. Ultrices sagittis orci a scelerisque purus semper eget duis. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. A cras semper auctor neque. Est pellentesque elit ullamcorper dignissim.',
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit. Scelerisque eu ultrices vitae auctor eu augue ut. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Aliquam ut porttitor leo a diam sollicitudin tempor id. Sit amet justo donec enim diam vulputate ut. Aliquet bibendum enim facilisis gravida. Accumsan tortor posuere ac ut consequat semper viverra nam. Fringilla est ullamcorper eget nulla. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Nibh ipsum consequat nisl vel pretium lectus quam. Turpis nunc eget lorem dolor. Duis ultricies lacus sed turpis tincidunt id. Facilisis volutpat est velit egestas. Leo urna molestie at elementum eu facilisis. Fermentum odio eu feugiat pretium nibh ipsum consequat. Turpis egestas maecenas pharetra convallis posuere morbi leo urna. Leo integer malesuada nunc vel risus commodo viverra maecenas. Volutpat odio facilisis mauris sit amet massa vitae tortor. Ultrices sagittis orci a scelerisque purus semper eget duis. Facilisis magna etiam tempor orci eu lobortis elementum nibh tellus. A cras semper auctor neque. Est pellentesque elit ullamcorper dignissim.',
            ],
          });

          expect(partitionKey).toBe(
            '8fc24958096812b3f3e6d8c83ffe908375e5980471a40a0be378cd315bcbe465cbba6cc316d7e2eee0542be4ac8cd1f6a6bd525b0cf2f63cf1ce29a35df8f3be'
          );
        });
      });
    });
  });
});
