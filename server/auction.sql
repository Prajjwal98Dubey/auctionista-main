
create table users (
user_id varchar(255) primary key, 
user_name varchar(255),
user_email varchar(255),
user_password varchar(255) not null,
user_refresh_token varchar(512) not null,
user_first_name varchar(255),
user_last_name varchar(255),
users_unqiue_identifier varchar(255),
user_contact_no varchar(20),
user_address_line_1 varchar(255),
user_city varchar(50),
user_country varchar(50),
user_role varchar(30),
is_third_party_auth boolean
)

create table product(
product_id varchar(255) primary key,
product_user_id varchar(255),
product_set_price integer not null,
product_original_price integer,
product_title varchar(255),
product_desc text,
product_category varchar(150),
product_usage_time varchar(150),
bid_start_time varchar(150),
highest_bid integer default 0,
product_appeal text
)

create table mobile_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(10) default 'Mobile',
brand_name varchar(255),
model_name varchar(255),
ram_storage varchar(100),
rom_storage varchar(100),
operating_system varchar(100),
rear_camera varchar(150),
front_camera varchar(150),
is_touch_screen boolean,
product_color varchar(50),
screen_size varchar(50)
)

create table laptop_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(10) default 'Laptop',
brand_name varchar(255),
model_name varchar(255),
ram_storage varchar(100),
rom_storage varchar(100),
operating_system varchar(100),
product_color varchar(50),
screen_size varchar(50)
)

create table watch_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(10) default 'Watch',
brand_name varchar(255),
model_name varchar(255),
is_touch_screen boolean,
product_color varchar(50),
diameter smallint,
is_digital boolean,
is_calling_availabe boolean,
have_fitness_tracer boolean
)

create table headphone_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(20) default 'Headphone',
brand_name varchar(255),
model_name varchar(255),
product_color varchar(50),
is_wireless boolean,
is_headphone boolean
)

create table general_electronics_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(10) default 'Others',
brand_name varchar(255),
model_name varchar(255),
product_color varchar(50),
product_spec_desc text
)

create table furniture(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
brand_name varchar(255),
product_spec_desc text,
materials_used text[]
)

create table painting(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
painter_name varchar(255),
year_of_creation varchar(255),
painting_desc text,
have_painter_sign boolean,
painting_appeal text,
country_of_painter varchar(100)
)

create table general_product(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
why_special text,
is_sign boolean,
signing_person_name boolean,
signing_person_description text,
product_spec_desc text
)

create table product_image(
image_id varchar(255) primary key,
product_id varchar(255),
product_user_id varchar(255),
image text
)

create table monitor_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(15) default 'Monitor',
brand_name varchar(255),
model_name varchar(255),
product_color varchar(50),
screen_size varchar(50),
product_spec_desc text
)

create table keyboard_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(15) default 'Keyboard',
brand_name varchar(255),
model_name varchar(255),
product_color varchar(50),
product_spec_desc text
)

create table mouse_spec(
product_id varchar(255) primary key,
foreign key (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
category varchar(15) default 'Keyboard',
brand_name varchar(255),
model_name varchar(255),
product_color varchar(50),
product_spec_desc text,
is_wireless boolean
)