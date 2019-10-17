create table spots (
	id VARCHAR(50) PRIMARY KEY NOT NULL,
	name VARCHAR(50) NOT NULL,
	location VARCHAR(50) NOT NULL,
	image VARCHAR(1000) NOT NULL,
	description TEXT NOT NULL,
	price_range VARCHAR(50) NOT NULL
);
insert into spots (id, name, location, image, description, price_range) values ('035292350-4', 'D''Amore-Ortiz', 'Camajuaní', 'http://1688.com/volutpat/eleifend/donec/ut/dolor/morbi/vel.json', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis.', '$85.01');
insert into spots (id, name, location, image, description, price_range) values ('970454146-5', 'Gleichner and Sons', 'Balzar', 'https://people.com.cn/ut/ultrices.html', 'Nullam porttitor lacus at turpis.', '$20.03');
insert into spots (id, name, location, image, description, price_range) values ('985484447-1', 'Botsford and Sons', 'Palmas Bellas', 'http://gizmodo.com/tortor/duis/mattis/egestas/metus/aenean.jsp', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.', '$59.96');
insert into spots (id, name, location, image, description, price_range) values ('013932554-9', 'Wunsch Group', 'Mabuttal East', 'http://paypal.com/eu/massa/donec.aspx', 'Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', '$83.08');
insert into spots (id, name, location, image, description, price_range) values ('030906477-5', 'Schmidt LLC', 'Dolgoprudnyy', 'https://google.cn/hac/habitasse/platea/dictumst/etiam/faucibus/cursus.js', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo.', '$19.61');
insert into spots (id, name, location, image, description, price_range) values ('846649206-2', 'Schmitt and Sons', 'Winterthur', 'http://smugmug.com/mus/etiam/vel/augue.aspx', 'In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.', '$0.49');
insert into spots (id, name, location, image, description, price_range) values ('220917739-1', 'McLaughlin-Bednar', 'Nanyang', 'http://nba.com/in/felis/donec.aspx', 'Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius.', '$38.34');
insert into spots (id, name, location, image, description, price_range) values ('535280987-0', 'Runolfsson LLC', 'Tarrafal de São Nicolau', 'https://imdb.com/suspendisse/ornare/consequat/lectus.png', 'Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', '$56.68');
insert into spots (id, name, location, image, description, price_range) values ('600072899-9', 'Wilderman LLC', 'Yuncao', 'http://artisteer.com/curabitur/convallis/duis/consequat/dui/nec.xml', 'Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.', '$37.87');

create table comments (
  id VARCHAR(50) PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP
);