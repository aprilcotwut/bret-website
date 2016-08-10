var keystone = require('keystone');
var Types = keystone.Field.Types;

var GroupMember = new keystone.List('GroupMember', {
  map: { name: 'name' },
  autokey: { path: 'slug', from: 'name', unique: true },
});

GroupMember.add({
  image: { type: Types.CloudinaryImage, required: false },
  name: { type: Types.Name, required: true, index: true },
  active: { type: Boolean, label: 'Current group member'},
  status: { type: String, required: true, initial: true },
});

GroupMember.defaultColumns = "name, active, image, status";
GroupMember.register();
