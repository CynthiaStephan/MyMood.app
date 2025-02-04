-- Dumping data for table `users`
INSERT INTO `users` VALUES (1,'Darrel','Andrade','darrel@email.com','$2b$10$nmVuCDySH3mBQmpp4118wOVEwUXitNTt7tzmym2dfr4FZVzdKkeeW','trainee',0),
(2,'Benita ','AndrKellerde','benita@email.com','$2b$10$yCcEKzjlMa.OKOVMXDn3aeVpCAHx5yh2OydtXh32.RJswrLCi/AgS','trainee',0),
(3,'Erwin','Gamble','erwin@email.com','$2b$10$pouHNyED.KhoBGI49s297eK4hnB6nbkPsI9rVDWAHCzMiUKkrzeBu','trainee',0),
(4,'Royal','Norman','royal@email.com','$2b$10$UESGBAKNW6l0dAJXSpnobObfWxU7RtGh36n9vCB1SLtIfrbemxV3y','trainee',0),
(5,'Douglas','Warren','douglass@email.com','$2b$10$xD4VJJyE.6Qy39uXVB7zXe8ZCWucmCcObQHX8M10TVuOBtQM21hsm','trainee',0),
(6,'Otha','Parrish','otha@email.com','$2b$10$jbdygESbeBiAavEeDUHOce9I01y/8DgX5FD2568nvcFTdXOOXl6Ie','supervisor',0),
(9,'Cornell','Cannon','cornell@email.com','$2b$10$zJa6pt5mJEnzs4/fzE.9Muiaja0BlpoVXNbU7DAfwOK6EePRlT0Iu','admin',0);
-- Dumping data for table `cohort`
INSERT INTO `cohort` VALUES (1,'Kim Possible'),(2,'Code Lyoko'),(3,'Totally Spies'),(4,'Winx');
-- Dumping data for table `blacklist`
INSERT INTO `blacklist` VALUES (1,2,6),(2,5,6);


-- Dumping data for table `cohort_user`
INSERT INTO `cohort_user` VALUES (4,1),(5,1),(1,2),(2,2),(3,2),(4,2);

-- Dumping data for table `mood_score`
INSERT INTO `mood_score` VALUES (1,52,1,'2025-01-31 09:46:27'),(2,1,2,'2025-01-31 09:46:35'),(3,89,3,'2025-01-31 09:46:43'),(4,23,4,'2025-01-31 09:46:52');

