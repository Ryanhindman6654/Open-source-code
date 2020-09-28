IMPORTANT ------
I can not know what type of command handler you have or how you set up your commands
so you might need to customize my code if you get errors 

Dm me if u need help.

IMPORTANT------

// Code:

    try {
        // * If we mention a user or send a id
        const targetUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        //* When the user joined the server
        const joinedDate = new Date(message.member.joinedTimestamp);

        // * The  timestamp of when the user joined discord
        const createdDate = new Date(message.author.createdTimestamp);
        
        //* Current date
        const currentDate = new Date();

        //* How old a user is by years
        const years_since_created = currentDate.getFullYear() - createdDate.getFullYear();
        
        //* How old a user is by days
        const days_since_created = Math.round((currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));

        //* getting the date for when a user joins or is created.
        function getDate(date) { 
            
            //* all the months
            let months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ];
            //* all the days
            let Days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ]
            //* Making sure for correct PM and AM
            let clockTime = (date.getHours() >= 12) ? "PM" : "AM";

            //* Making sure for correct date with the st, nd, rd and th
            let suffix = (date.getDate() >= 4 &&  date.getDate() <= 20) 
            || (date.getDate() >= 24 && date.getDate() <= 30) ? "th" 
            : ["st", "nd", "rd"][date.getDate() % 10 - 1];

            //* Here we return the message with the dates
            return `**Date:**\n\`${Days[date.getDay()]}, ${date.getDate()}${suffix} ${months[date.getMonth()]} ${date.getFullYear()}\`\n**Time:**\n\`${date.getHours()}:${date.getMinutes()}${clockTime}\``;
        }

        //* If the user mentioned a role instead of a user
        if (message.mentions.roles.first()) {
            return message.channel.send(`**${message.author.tag}** I can't find any info about this \`"user"\` you did mention`)
        }


        //* Getting what special permissions the user has in the server
        function getPermissions(user) {

            if (message.guild.ownerID === user.id)
            return "`Server Owner`";

            if (user.hasPermission("ADMINISTRATOR"))
            return "`Administrator`";

            if (user.hasPermission("BAN_MEMBERS") || user.hasPermission("KICK_MEMBERS")) 
                return "`Moderator`";

            if (user.hasPermission('MANAGE_MESSAGES'))
                return "`Helper`";
            
            else
                return "`Member`";

        }

        //* if we mention a user or a send a id
        if (targetUser) {

        let mentioned_user_created_date = new Date(targetUser.user.createdTimestamp);
        
        const mentioned_user_years_since_created = currentDate.getFullYear() - mentioned_user_created_date.getFullYear();
        
        const mentioned_user_days_since_created = Math.round((currentDate.getTime() - mentioned_user_created_date.getTime()) / (1000 * 3600 * 24));
        
        mentioned_user_joinedDate = new Date(targetUser.joinedTimestamp);

            //* info about the user we mention or user by id
            let mentionedUserInfo = {
                //* Most of these can be explained itself by name
                tag: `-${targetUser.user.tag}(s) Info-`,
                username: targetUser.user.username,
                nickname: `\`${targetUser.displayName}\``,
                discriminator: targetUser.user.discriminator,
                id: targetUser.id,
                //* Here we call the function with the variable that have the created date of the user
                created: getDate(mentioned_user_created_date),
                serverRole: getPermissions(targetUser),

                //* Here we call the function with the variable 
                //* that have the joined date of when the user joined the server
                joined: getDate(mentioned_user_joinedDate),
                //* How old the user is by years and days
                accountAge: `\`${mentioned_user_years_since_created} Years Old\n${mentioned_user_days_since_created} Days Old\`\n\n**Bot:**\n \`${targetUser.user.bot}\``,
                //* The users avatar
                avatar: targetUser.user.displayAvatarURL({dynamic: true, format: 'png'}),
                
                //* Highest role the user have in the server
                highestRole: `\`${targetUser.roles.highest.name}\``,

                //* What status the user have
                status: function getStatus() {
                    switch(targetUser.user.presence.status) {
                        case "online":
                            return ":green_circle: `Online`";
                        case "idle":
                            return "🌒 `Idle`";
                        case "dnd":
                            return "🔴 `Do Not Disturb`";
                        case "offline":
                            return "👤 `Offline`";
                        default:
                            return "`No Status Found.`";
                    }
                },
            } 

            message.channel.send(
                // * Our embed
                    new MessageEmbed()
                    
                    .setColor('RANDOM')
                    .setAuthor(`Requested By: ${message.author.tag}`)
                    .setTitle(`${mentionedUserInfo.tag}`)
                    .setThumbnail(mentionedUserInfo.avatar)
                    .addFields(
                    
                        { name: 'Joined server', value: mentionedUserInfo.joined , inline: true }, 
                        { name: 'Created', value: mentionedUserInfo.created, inline: true }, 
                        { name: "Current Status", value: mentionedUserInfo.status(), inline: true },
                        { name: 'Nickname', value: mentionedUserInfo.nickname, inline: true},
                        { name: 'Account Age', value: mentionedUserInfo.accountAge, inline: true },
                        { name: ':crown: Highest Role', value: mentionedUserInfo.highestRole, inline: true },
                        { name: 'Server Role', value: mentionedUserInfo.serverRole, inline: true }        
                )
                .setFooter(`Username: ${mentionedUserInfo.username}\nDiscriminator: ${mentionedUserInfo.discriminator}\nID: ${mentionedUserInfo.id}`)
                .setTimestamp()
            );
        } 

        //* If we didn't mention anyone
        else {

        // * Info about who executed the message
        //* If they didn't mention anyone
        let userInfo = {

            tag: `-${message.author.tag}(s) Info-`,
            username: message.author.username,
            nickname: `\`${message.member.displayName}\``,
            discriminator: message.author.discriminator,
            id: message.author.id,
            serverRole: getPermissions(message.member),
            created: getDate(createdDate),
            joined: getDate(joinedDate),
            accountAge: `\`${years_since_created} Years Old\n${days_since_created} Days Old\`\n\n**Bot:** \`${message.member.user.bot}\``,
            avatar: message.author.displayAvatarURL({dynamic: true, format: 'png'}),
            highestRole: `\`${message.member.roles.highest.name}\``,
            status: function getStatus() {
                switch(message.author.presence.status) {
                    case "online":
                        return ":green_circle: `Online`";
                    case "idle":
                        return "🌒 `Idle`";
                    case "dnd":
                        return "🔴 `Do Not Disturb`";
                    case "offline":
                        return "👤 `Offline`";
                    default:
                        return "`No Status Found.`";
                }
            },
        }

        message.channel.send(
            // * Our embed
                new MessageEmbed()
                
                .setColor('RANDOM')
                .setAuthor(`Requested By: ${message.author.tag}`)
                .setTitle(`${userInfo.tag}`)
                .setThumbnail(userInfo.avatar)
                .addFields(
                
                    { name: 'Joined server', value: userInfo.joined , inline: true }, 
                    { name: 'Created', value: userInfo.created, inline: true }, 
                    { name: 'Account Age', value: userInfo.accountAge, inline: true },
                    { name: "Current Status", value: userInfo.status(), inline: true },
                    { name: 'Nickname', value: userInfo.nickname, inline: true},
                    { name: ':crown:  Highest Role', value: userInfo.highestRole, inline: true },
                    { name: 'Server Role', value: userInfo.serverRole, inline: true }
            )
            .setFooter(`Username: ${message.author.username}\nDiscriminator: ${userInfo.discriminator}\nID: ${userInfo.id}`)
            .setTimestamp()
            );
        }
    } catch (err) {
        console.error(err);
    }
