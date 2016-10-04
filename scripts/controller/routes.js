'use strict';

page('/admin', adminController.reveal);
page('/about', aboutController.reveal);
page('/', articleController.reveal);

page();
