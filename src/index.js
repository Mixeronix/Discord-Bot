import { Client, Events, GatewayIntentBits, Routes, REST, Integration } from "discord.js";
import token from "../config.json" assert { type: "json" };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(token.token);

client.once(Events.ClientReady, async (c) => {
	console.clear();
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

async function main() {
	const commands = [
		{
			name: "ping",
			description: "Replies with Pong!",
		},
	];
	try {
		await rest.put(Routes.applicationGuildCommands("1051643493577130004", "1051649341137354874"), { body: commands });
		client.login(token.token);
	} catch (e) {
		console.error(e);
	}
}

main();

client.on(Events.InteractionCreate, (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	switch (interaction.commandName) {
		case "ping":
			ping(interaction);

			break;
	}
});

function ping(i) {
	i.reply("s");
}
