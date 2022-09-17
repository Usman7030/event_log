const {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} = require("@eventstore/db-client");

var moment = require("moment");

const client = EventStoreDBClient.connectionString(
  "esdb://host:port?tls=false"
);

console.log(client);

async function abc() {
  return (events = await client.readAll({
    direction: FORWARDS,
    fromPosition: START,
    maxCount: 10,
  }));
}

async function def() {
  streamName = "$ce-entity-state";
  const events = client.readStream(streamName, {
    fromRevision: START,
    direction: FORWARDS,
    maxCount: 10,
  });
  console.log("from here :", Object.keys(events).length);

  for await (const event of events) {
    //17 Sep 2022 01:50 am

    var CurrentDate = moment().valueOf(event.event.created);

    const dateTime = moment(CurrentDate).format("DD MMM YYYY hh:mm a");
    console.log(dateTime);

    // to check specfic time , if needed

    var date = moment("17 Sep 2022 01:50 am");
    // var now = moment();

    // if (now > date) {
    //   console.log("now time is :", now);
    // }

    // filter on specific event type 
    if (event.event.type == "EntityOnStateEvent") {
      console.log(event);
    }
  }
}

async function main() {
  pk = await abc();

  console.log(pk);

  await def();
}

main();
