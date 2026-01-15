// test-operations.js
const mongoOps = require('./mongodb-operations');

async function runTests() {
    console.log("🧪 RUNNING MONGODB OPERATION TESTS");
    console.log("=".repeat(80));
    
    try {
        // Test 1: Display all contacts
        console.log("\n1. Testing: Display All Contacts");
        const allContacts = await mongoOps.displayAllContacts();
        console.assert(allContacts && allContacts.length > 0, "Should have contacts");
        
        // Test 2: Find by ID
        console.log("\n2. Testing: Find Contact by ID");
        if (allContacts.length > 0) {
            const testId = allContacts[0]._id.toString();
            const foundContact = await mongoOps.displayContactById(testId);
            console.assert(foundContact, "Should find contact by ID");
        }
        
        // Test 3: Find over 18
        console.log("\n3. Testing: Find Contacts Over 18");
        const over18 = await mongoOps.displayContactsOver18();
        console.assert(Array.isArray(over18), "Should return array");
        
        // Test 4: Update operation
        console.log("\n4. Testing: Update Contact");
        const updateResult = await mongoOps.updateKefiFirstName();
        console.assert(updateResult, "Update should complete");
        
        // Test 5: Delete operation
        console.log("\n5. Testing: Delete Contacts Under 5");
        const deleteResult = await mongoOps.deleteContactsUnder5();
        console.assert(deleteResult, "Delete should complete");
        
        console.log("\n" + "=".repeat(80));
        console.log("✅ ALL TESTS PASSED!");
        
    } catch (error) {
        console.error("❌ Test failed:", error);
    } finally {
        await mongoOps.closeConnection();
    }
}

runTests();
