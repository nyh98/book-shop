INSERT INTO books(title, author, summary_info, price, description, total_pages, ISBN, chapters, release_day, genre_id)
VALUES ('클린코드', '김떙떙', '클린 코드를 위해..', 20000, '코드 작성 방법 어쩌구...', 500,'a123','목차 챕터', '2023-02-01', 1);

INSERT INTO books(title, author, summary_info, price, description, total_pages, ISBN, chapters, release_day, genre_id)
VALUES ('객체지향의 사실과 오해', '박떙떙', '객체 지향을 위해..', 30000, '객체는 어쩌구...', 300,'b123','목차 챕터', '2024-04-01', 1);

INSERT INTO books(title, author, summary_info, price, description, total_pages, ISBN, chapters, release_day, genre_id)
VALUES ('광해군', '오떙떙', '역사가 어쩌구..', 35000, '광해군 어쩌구...', 600,'c123','목차 챕터', '2024-04-02', 3);

INSERT INTO books(title, author, summary_info, price, description, total_pages, ISBN, chapters, release_day, genre_id)
VALUES ('아트책1', '오떙떙', '아트가 어쩌구..', 45000, '아트에 대해서 어쩌구...', 600,'d23','목차 챕터', '2022-04-02', 2);

INSERT INTO books(title, author, summary_info, price, description, total_pages, ISBN, chapters, release_day, genre_id)
VALUES ('아트박스', '오떙떙', '아트박스..', 55000, '아트박스가 어쩌구...', 600,'e123','목차 챕터', '2024-03-20', 2);

INSERT INTO books(title, author, summary_info, price, description, total_pages, ISBN, chapters, release_day, genre_id)
VALUES ('세종대왕', '오떙떙', '세종대왕은..', 53000, '세종대왕 어쩌구...', 600,'f123','목차 챕터', '2023-04-02', 3);


SELECT title , author , summary_info , price , description , total_pages , ISBN , chapters , release_day , genres.genre, 
(SELECT COUNT(*) FROM likes WHERE books.id = book_id) AS likes 
FROM books JOIN genres ON books.genre_id = genres.id 
WHERE books.id = 1;

