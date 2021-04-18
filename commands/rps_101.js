module.exports = {
    name: 'rps101',
    description: 'pve and pvp rock, paper, scissors using the 101 item variation',
    async execute(message, args) {
        // create dictionary of item and number code
        // formula: for item number i, i wins for i+1 through i+50, loses for i+51 through i+100, tie otherwise
        // (above numbers are all mod 101)
        var dict = {
            "dynamite": 1,
            "tornado": 2,
            "quicksand": 3,
            "pit": 4,
            "chain": 5,
            "gun": 6,
            "law": 7,
            "whip": 8,
            "sword": 9,
            "rock": 10,
            "death": 11,
            "wall": 12,
            "sun": 13,
            "camera": 14,
            "fire": 15,
            "chainsaw": 16,
            "school": 17,
            "scissors": 18,
            "poison": 19,
            "cage": 20,
            "axe": 21,
            "peace": 22,
            "computer": 23,
            "castle": 24,
            "snake": 25,
            "blood": 26,
            "porcupine": 27,
            "vulture": 28,
            "monkey": 29,
            "king": 30,
            "queen": 31,
            "prince": 32,
            "princess": 33,
            "police": 34,
            "woman": 35,
            "baby": 36,
            "man": 37,
            "home": 38,
            "train": 39,
            "car": 40,
            "noise": 41,
            "bicycle": 42,
            "tree": 43,
            "turnip": 44,
            "duck": 45,
            "wolf": 46,
            "cat": 47,
            "bird": 48,
            "fish": 49,
            "spider": 50,
            "cockroach": 51,
            "brain": 52,
            "community": 53,
            "cross": 54,
            "money": 55,
            "vampire": 56,
            "sponge": 57,
            "church": 58,
            "butter": 59,
            "book": 60,
            "paper": 61,
            "cloud": 62,
            "airplane": 63,
            "moon": 64,
            "grass": 65,
            "film": 66,
            "toilet": 67,
            "air": 68,
            "planet": 69,
            "guitar": 70,
            "bowl": 71,
            "cup": 72,
            "beer": 73,
            "rain": 74,
            "water": 75,
            "television": 76,
            "rainbow": 77,
            "ufo": 78,
            "alien": 79,
            "prayer": 80,
            "mountain": 81,
            "satan": 82,
            "dragon": 83,
            "diamond": 84,
            "platinum": 85,
            "gold": 86,
            "devil": 87,
            "fence": 88,
            "video game": 89,
            "math": 90,
            "robot": 91,
            "heart": 92,
            "electricity": 93,
            "lightning": 94,
            "medusa": 95,
            "power": 96,
            "laser": 97,
            "nuke": 98,
            "sky": 99,
            "tank": 100,
            "helicopter": 101
        }

        // if user asked for help/list of items:
        if (args.length === 0 || args[0] === "help" || args[0] === "list") {
            var result = "Please ping a user to face off against or compete against me by picking one of the following valid items: ";
            for (const [key, value] of Object.entries(dict)) {
                result += `${key}, `;
            }
            message.reply(result.slice(0,result.length - 2));
            return;
        }

        // declare variables
        var user_a = message.author;
        var user_b = message.client.user;
        var item_a;
        var item_b;
        var valid_item;

        var args_0 = args[0].slice(2, args[0].length-1);
        if (args_0.startsWith('!')) {
            args_0 = args_0.slice(1);
        }

        // determine pvp or pve
        try {
            user_b = await message.guild.members.fetch(args_0);

            // prompt users to input item choices
            // receive item choices (DMs?)
        } catch {
            // is derpbot woo
            user_b = message.guild.me;

            // parse user's item
            item_a = args[0];

            // randomly select item
            const random_val = Math.floor(Math.random(101));
            for (const [key, value] of Object.entries(dict)) {
                if (value === random_val) {
                    item_b = key;
                }
            }
        }

        // if pvp, get both items from DMs
        if (!item_b) {
            // check to make sure another user is mentioned
            let regex = /<@!*[0-9]+>/
            if (!regex.test(args[0])) {
                message.reply("please mention a valid user to face off against.");
                return;
            } else {
                var test = args[0].slice(2, args[0].length - 1);
                if (test.startsWith('!')) {
                    test = test.slice(1);
                }
                try {
                    user_b = await message.guild.members.fetch(test);
                } catch {
                    message.reply("something went wrong while trying to locate this person, please make sure you've properly mentioned them");
                    return;
                }
        }
            // send dm to each user

            // parse item from each dm

            // do the checks to make sure items are valid
        }
        // else pve
        else {
            // validate item_a
            // check for possible duplicate weirdness, t.v. tv and u.f.o. first
            if (item_a === 't.v.' || item_a === 'tv') {
                item_a = 'television';
            } else if (item_a === 'u.f.o.') {
                item_a = 'ufo';
            }
            
            // iterate to find
            for (const [key, value] of Object.entries(dict)) {
                if (key === item_a) {
                    valid_item = true;
                }
            }
            
            // check to make sure item_a actually got initialized
            if (!item_a || !valid_item) {
                message.reply("Please choose a valid item to compete in RPS 101. Do !rps101 list to see the list of valid items.");
                return;
            }
        }

        // identify winner
        var winner;

        // check ties first
        if (dict[item_a] === dict[item_b]) {
            // end it here
            message.reply(`here's the result of your !rps101 match: It's a tie! Both ${user_a.username} `
            + `and ${user_b.username} chose ${item_b}.`);
            return;
        }

        var max_is_a = (Math.max(dict[item_a], dict[item_b]) === dist[item_a]);
        if (Math.abs(dict[item_a] - dict[item_b] > 50)) {
            if (max_is_a) {
                // a wins
                winner = 'a';
            } else {
                // b wins
                winner = 'b';
            }
        } else if (max_is_a) {
            // b wins
            winner = 'b';
        } else {
            // a wins
            winner = 'a';
        }

        var winning_item;
        var losing_item;
        var winning_user;
        if (winner === 'a') {
            winning_item = item_a;
            losing_item = item_b;
            winning_user = user_a;
        } else if (winner === 'b') {
            winning_item = item_b;
            losing_item = item_a;
            winning_user = user_b;
        }

        // send message of A:item vs B/derpbot:item, item beats item so winner wins
        message.reply(`here's the result of your !rps101 match: ${user_a.username} chose ${item_a} and ` 
            + `${user_b.username} chose ${item_b}. Since ${winning_item} beats ${losing_item}, ${winning_user.username} `
            + `is the victor! :HYPERS:`)

    }
}