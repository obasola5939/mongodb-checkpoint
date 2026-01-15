// complete-solution.js
// This file provides a complete, step-by-step solution as requested

const { MongoClient, ObjectId } = require('mongodb');

async function completeSolution() {
    const client = new MongoClient("mongodb://localhost:27017");
    
    try {
        // Step 1: Connect to MongoDB
        await client.connect();
        console.log("✅ Step 1: Connected to MongoDB");
        
        const db = client.db("contact");
        
        // Step 2: Create collection (if not exists) and insert documents
        console.log("\n✅ Step 2: Creating collection and inserting documents...");
        
        const contacts = [
            { last_name: "Ben", first_name: "Moris", email: "ben@gmail.com", age: 26 },
            { last_name: "Kefi", first_name: "Seif", email: "kefi@gmail.com", age: 15 },
            { last_name: "Emilie", first_name: "brouge", email: "emilie.b@gmail.com", age: 40 },
            { last_name: "Alex", first_name: "brown", age: 4 },
            { last_name: "Denzel", first_name: "Washington", age: 3 }
        ];
        
        const collection = db.collection("contactlist");
        await collection.deleteMany({}); // Clear existing data
        const insertResult = await collection.insertMany(contacts);
        console.log(`   Inserted ${insertResult.insertedCount} documents`);
        
        // Step 3: Display all contacts
        console.log("\n✅ Step 3: Display all contacts:");
        console.log("-".repeat(60));
        let allContacts = await collection.find({}).toArray();
        allContacts.forEach(doc => {
            console.log(`   ${doc.first_name} ${doc.last_name}, Email: ${doc.email || 'N/A'}, Age: ${doc.age}`);
        });
        
        // Step 4: Display information about one person using ID
        console.log("\n✅ Step 4: Display contact by ID:");
        console.log("-".repeat(60));
        if (allContacts.length > 0) {
            const firstContact = allContacts[0];
            const contactById = await collection.findOne({ _id: firstContact._id });
            console.log(`   Found: ${contactById.first_name} ${contactById.last_name}, Age: ${contactById.age}`);
        }
        
        // Step 5: Display contacts with age > 18
        console.log("\n✅ Step 5: Contacts with age > 18:");
        console.log("-".repeat(60));
        const adults = await collection.find({ age: { $gt: 18 } }).toArray();
        adults.forEach(adult => {
            console.log(`   ${adult.first_name} ${adult.last_name}, Age: ${adult.age}`);
        });
        
        // Step 6: Display contacts with age > 18 and name containing "ah"
        console.log("\n✅ Step 6: Contacts with age > 18 and name containing 'ah':");
        console.log("-".repeat(60));
        const regex = /ah/i;
        const adultsWithAh = await collection.find({
            age: { $gt: 18 },
            $or: [
                { first_name: regex },
                { last_name: regex }
            ]
        }).toArray();
        
        if (adultsWithAh.length > 0) {
            adultsWithAh.forEach(contact => {
                console.log(`   ${contact.first_name} ${contact.last_name}, Age: ${contact.age}`);
            });
        } else {
            console.log("   No contacts found matching the criteria.");
        }
        
        // Step 7: Change contact's first name from "Kefi Seif" to "Kefi Anis"
        console.log("\n✅ Step 7: Updating Kefi Seif to Kefi Anis...");
        console.log("-".repeat(60));
        const updateResult = await collection.updateOne(
            { last_name: "Kefi", first_name: "Seif" },
            { $set: { first_name: "Anis" } }
        );
        console.log(`   Modified ${updateResult.modifiedCount} document(s)`);
        
        // Verify the update
        const updatedContact = await collection.findOne({ last_name: "Kefi", first_name: "Anis" });
        if (updatedContact) {
            console.log(`   Updated to: ${updatedContact.first_name} ${updatedContact.last_name}`);
        }
        
        // Step 8: Delete contacts aged under 5
        console.log("\n✅ Step 8: Deleting contacts aged under 5...");
        console.log("-".repeat(60));
        const deleteResult = await collection.deleteMany({ age: { $lt: 5 } });
        console.log(`   Deleted ${deleteResult.deletedCount} document(s)`);
        
        // Step 9: Display final contact list
        console.log("\n✅ Step 9: Final contact list:");
        console.log("-".repeat(60));
        const finalContacts = await collection.find({}).toArray();
        finalContacts.forEach(doc => {
            console.log(`   ${doc.first_name} ${doc.last_name}, Email: ${doc.email || 'N/A'}, Age: ${doc.age}`);
        });
        
        console.log(`\n📊 Final count: ${finalContacts.length} contact(s)`);
        
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await client.close();
        console.log("\n🔌 Connection closed.");
    }
}

// Run the complete solution
completeSolution();
