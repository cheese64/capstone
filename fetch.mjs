import fetch from 'node-fetch'
import { MongoClient } from 'mongodb'

async function main() {
	const uri = "mongodb+srv://user:YVzW36G0g0E4Zg0e@capstoneproject.25frl.mongodb.net/capstone?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useUnifiedTopology: true })
    try {
        await client.connect()
        getAnimals(client)
        
    } catch (e) {
        console.error(e)
    } // finally { await client.close() }
}

async function getAnimals(client){
    const animals = client.db("capstone").collection("zooanimals")

    fetch('https://zoo-animal-api.herokuapp.com/animals/rand/10').
    then(response => response.json()).
    then(data => 
    {
        const result = animals.insertMany(data)
        console.log(`${result.insertedCount} new listing(s) created with the following id(s):`)
        console.log(result.insertedIds)
    })
}

main().catch(console.error);

