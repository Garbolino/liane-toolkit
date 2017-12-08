import SimpleSchema from "simpl-schema";

const Geolocations = new Mongo.Collection("geolocations");

Geolocations.centerSchema = new SimpleSchema({
  lnt: {
    type: String
  },
  lat: {
    type: String
  }
});

Geolocations.schema = new SimpleSchema({
  name: {
    type: String
  },
  parentId: {
    type: String,
    optional: true
  },
  facebook: {
    type: Object,
    blackbox: true
  },
  geoId: {
    type: String,
    optional: true
  },
  center: {
    type: String,
    optional: true
  },
  polygon: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date,
    autoValue() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        return this.unset();
      }
    }
  }
});

Geolocations.attachSchema(Geolocations.schema);

exports.Geolocations = Geolocations;
