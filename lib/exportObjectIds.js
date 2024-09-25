var file = cat('~/desktop/output.txt'); // Replace with the full path to your .txt file
db.employees.find({}, { _id: 1 }).forEach(function(doc) {
    print(doc._id.str);
});
