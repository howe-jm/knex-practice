BEGIN;

INSERT INTO blogful_articles (title, date_published, content) VALUES
  ('Blog 21',  now() - '22 days'::INTERVAL, 'Man''s not torrid'),
  ('Blog 20',  now() - '21 days'::INTERVAL, 'Despotato'),
  ('Blog 19',  now() - '21 days'::INTERVAL, 'Cats that teach SQL'),
  ('Blog 18',  now() - '20 days'::INTERVAL, 'UpTown Monk'),
  ('Blog 17',  now() - '19 days'::INTERVAL, 'Despotato'),
  ('Blog 16',  now() - '19 days'::INTERVAL, 'Shape of Pooh'),
  ('Blog 15',  now() - '18 days'::INTERVAL, 'Cats that teach SQL'),
  ('Blog 14',  now() - '18 days'::INTERVAL, 'UpTown Monk'),
  ('Blog 13',  now() - '18 days'::INTERVAL, 'Man''s not torrid'),
  ('Blog 12',  now() - '18 days'::INTERVAL, 'Despotato'),
  ('Blog 11',  now() - '17 days'::INTERVAL, 'UpTown Monk'),
  ('Blog 10',  now() - '17 days'::INTERVAL, 'UpTown Monk'),
  ('Blog 9',   now() - '16 days'::INTERVAL, 'Man''s not torrid'),
  ('Blog 8',   now() - '12 days'::INTERVAL, 'Cats that teach SQL'),
  ('Blog 7',   now() - '10 days'::INTERVAL, 'Despotato'),
  ('Blog 6',   now() - '10 days'::INTERVAL, 'Shape of Pooh'),
  ('Blog 5',   now() - '9 days'::INTERVAL, 'Despotato'),
  ('Blog 4',   now() - '3 days'::INTERVAL, 'Man''s not torrid'),
  ('Blog 3',   now() - '2 days'::INTERVAL, 'Man''s not torrid'),
  ('Blog 2',   now() - '1 days'::INTERVAL, 'Man''s not torrid'),
  ('Blog 1',   now() - '2 hours'::INTERVAL, 'Man''s not torrid');

COMMIT;