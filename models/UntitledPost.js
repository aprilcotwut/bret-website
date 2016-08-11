var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * UntitledPost Model
 * ==========
 * Use for Publications and Teaching
 */

var UntitledPost = new keystone.List('UntitledPost', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

UntitledPost.add({
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: { type: Types.Html, wysiwyg: true, height: 200 required: true},
	categories: { type: Types.Relationship, ref: 'UntitledPostCategory', many: true },
});

UntitledPost.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

UntitledPost.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
UntitledPost.register();
