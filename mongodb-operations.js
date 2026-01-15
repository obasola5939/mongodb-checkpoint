// cli-interface.js
const readline = require('readline');
const mongoOps = require('./mongodb-operations');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayMenu() {
    console.clear();
    console.log("📞 MONGODB CONTACT MANAGEMENT SYSTEM");
    console.log("=".repeat(50));
    console.log("1. Display All Contacts");
    console.log("2. Find Contact by ID");
    console.log("3. Find Contacts Over 18");
    console.log("4. Find Contacts Over 18 with 'ah' in Name");
    console.log("5. Update Kefi's First Name");
    console.log("6. Delete Contacts Under 5 Years Old");
    console.log("7. View Statistics");
    console.log("8. Run All Operations (Exercise Sequence)");
    console.log("9. Reset Database");
    console.log("0. Exit");
    console.log("=".repeat(50));
}

async function handleChoice(choice) {
    switch (choice) {
        case '1':
            await mongoOps.displayAllContacts();
            break;
        case '2':
            rl.question('Enter Contact ID: ', async (id) => {
                await mongoOps.displayContactById(id);
                promptNextAction();
            });
            return; // Don't prompt here, will prompt after ID input
        case '3':
            await mongoOps.displayContactsOver18();
            break;
        case '4':
            await mongoOps.displayContactsOver18WithAh();
            break;
        case '5':
            await mongoOps.updateKefiFirstName();
            break;
        case '6':
            await mongoOps.deleteContactsUnder5();
            break;
        case '7':
            await mongoOps.displayContactStatistics();
            break;
        case '8':
            await mongoOps.main();
            break;
        case '9':
            console.log("\n🔄 Resetting database...");
            // This would require dropping and recreating the collection
            console.log("Reset functionality would be implemented here.");
            break;
        case '0':
            console.log("\n👋 Goodbye!");
            rl.close();
            process.exit(0);
            return;
        default:
            console.log("\n❌ Invalid choice. Please try again.");
    }
    promptNextAction();
}

function promptNextAction() {
    console.log("\n" + "-".repeat(50));
    rl.question('Press Enter to return to menu...', () => {
        startCLI();
    });
}

function startCLI() {
    displayMenu();
    rl.question('\nSelect an option (0-9): ', async (choice) => {
        await handleChoice(choice);
    });
}

// Start the CLI
if (require.main === module) {
    console.log("🔌 Connecting to MongoDB...");
    startCLI();
}
