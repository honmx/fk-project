--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: coaches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.coaches (
    id integer NOT NULL,
    photo text,
    type text,
    name text,
    birth text,
    education text[] DEFAULT ARRAY[]::text[],
    "startedPlaying" integer,
    "firstCoachName" text,
    "currentTeam" text,
    teams text[] DEFAULT ARRAY[]::text[],
    achievements text[] DEFAULT ARRAY[]::text[],
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.coaches OWNER TO postgres;

--
-- Name: coaches_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.coaches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.coaches_id_seq OWNER TO postgres;

--
-- Name: coaches_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.coaches_id_seq OWNED BY public.coaches.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.news (
    id integer NOT NULL,
    photos text[],
    title text,
    text text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.news OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO postgres;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: coaches id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coaches ALTER COLUMN id SET DEFAULT nextval('public.coaches_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Data for Name: coaches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.coaches (id, photo, type, name, birth, education, "startedPlaying", "firstCoachName", "currentTeam", teams, achievements, "createdAt", "updatedAt") FROM stdin;
1	https://footykids-files-storage.storage.yandexcloud.net/coaches/%D0%A0%D1%83%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D1%8C_%D0%9F%D1%80%D1%83%D1%82%D0%BE%D0%B2%20%D0%94%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B9%20%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%B8%D1%87_07.06.1992	Руководитель	Прутов Дмитрий Сергеевич	07.06.1992	{"Высшее образование (ЮУрГУ)","Тренерская лицензия \\"C\\" UEFA"}	7	Рубанцев Эдуард Витальевич	ФК "Торпедо" Миасс	{"\\"Торпедо\\" Миасс","\\"Челябинск\\" Челябинск","\\"Металлург\\" Аша","\\"Тобол\\" Курган","\\"Металлург\\" Магнитогорск"}	{"Лучший полузащитник сезона 2019г. в зоне \\"Урал и Западная Сибирь\\"","Победитель Всероссийского первенства среди команд 3 дивизиона 2014г. (ФК \\"Металлург\\" Аша)","Серебрянный призер зоны \\"Урал и Западная Сибирь\\" 2017г. (ФК \\"Металлург\\" Аша)","Серебрянный призер зоны \\"Урал и Западная Сибирь\\" 2018г. (ФК \\"Торпедо\\" Миасс)","Брозновый призер зоны \\"Урал и Западная Сибирь\\" 2019г. (ФК \\"Торпедо\\" Миасс)","Победитель первенства и обладатель Кубка зоны \\"Урал и Западная Сибирь\\" 2020г. (ФК \\"Торпедо\\" Миасс)"}	2023-08-05 16:02:23.385+05	2023-08-05 16:02:23.385+05
3	https://footykids-files-storage.storage.yandexcloud.net/coaches/%D0%A2%D1%80%D0%B5%D0%BD%D0%B5%D1%80_%D0%92%D0%B0%D1%84%D0%B8%D0%BD%20%D0%AD%D0%B4%D1%83%D0%B0%D1%80%D0%B4%20%D0%A0%D0%B0%D0%B4%D0%B8%D0%BA%D0%BE%D0%B2%D0%B8%D1%87_19.11.1999	Тренер	Вафин Эдуард Радикович	19.11.1999	{"Факультет физической культуры (ЮУрГГПУ)"}	7	Колоколов Николай Андреевич	\N	{}	{"Многократный призер городских соревнований по большому и мини-футболу (ФК \\"Строитель\\" Миасс)","Многократный обладатель кубков на городских чемпионатах (ФК \\"Строитель\\" Миасс)","Обладатель кубка города 2019г. (ФК \\"Строитель\\" Миасс)","Чемпион города и обладатель Кубка города по футболу 2020г. (ФК \\"Строитель\\" Миасс)"}	2023-08-05 17:09:15.64+05	2023-08-05 17:09:15.64+05
4	https://footykids-files-storage.storage.yandexcloud.net/coaches/%D0%A2%D1%80%D0%B5%D0%BD%D0%B5%D1%80_%D0%A5%D0%BE%D0%BC%D0%B8%D0%BA%20%D0%A0%D0%BE%D0%BC%D0%B0%D0%BD%20%D0%A1%D0%B5%D1%80%D0%B3%D0%B5%D0%B5%D0%B2%D0%B8%D1%87_12.01.1995	Тренер	Хомик Роман Сергеевич	12.01.1995	{"Высшее образование (ЮУрГУ)"}	11	Вакушин Александр Викторович	\N	{"ФК \\"Миасс\\" Миасс","ФК \\"Торпедо\\" Миасс"}	{"Победитель всероссийского турнира \\"Кубок Виты\\" (АЗ \\"Урал\\" 2007г.)","Победитель чемпионата Челябинской области (ФК \\"Торпедо\\" Миасс 2009г.)","Бронзовый призер всероссийского турнира г. Анапа (ФК \\"Торпедо\\" Миасс 2009г.)","Бронзовый призер чемпионата России зона \\"Урал - Западная Сибирь\\" (ФК \\"Торпедо\\" Миасс 2010г.)","Двукратный победитель Спартакиады учащихся Челябинской области (ФК \\"Торпедо\\" Миасс 2010-2011гг.)","Серебряный призер чемпионата челябинской области (ФК \\"Торпедо\\" Миасс 2012г.)","Серебряный призер чемпионата Челябинской области (ФК \\"Торпедо\\" Миасс 2014г.)","Обладатель кубка города (\\"Смена\\" Миасс 2018г.)"}	2023-08-05 17:20:53.425+05	2023-08-05 17:20:53.425+05
2	https://footykids-files-storage.storage.yandexcloud.net/coaches/%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D1%8B%D0%B9%20%D1%82%D1%80%D0%B5%D0%BD%D0%B5%D1%80_%D0%9A%D0%BB%D0%B8%D0%BC%D0%B5%D0%BD%D0%BA%D0%BE%20%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%20%D0%92%D1%8F%D1%87%D0%B5%D1%81%D0%BB%D0%B0%D0%B2%D0%BE%D0%B2%D0%B8%D1%87_07.06.1992	Главный тренер	Клименко Александр Вячеславович	10.12.1994	{"Высшее образование (ЮУрГУ)","Тренерская лицензия \\"C\\" UEFA","1-ый взрослый разряд по футболу"}	7	Вакушин Александр Викторович	\N	{"ФК \\"Миасс\\" Миасс"}	{"Победитель чемпионата Челябинской области (ФК \\"Торпедо\\" Миасс 2009г.)","Бронзовый призер всероссийского турнира г. Анапа (ФК \\"Торпедо\\" Миасс 2009г.)","Бронзовый призер чемпионата России зона \\"Урал - Западная Сибирь\\" (ФК \\"Торпедо\\" Миасс 2010г.)","Двукратный победитель Спартакиады учащихся Челябинской области (ФК \\"Торпедо\\" Миасс 2010-2011гг.)","Серебряный призер чимпионата Челябинской области (ФК \\"Торпедо\\" Миасс 2012г.)"}	2023-08-05 16:57:32.138+05	2023-08-05 16:57:32.138+05
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.news (id, photos, title, text, "createdAt", "updatedAt") FROM stdin;
1	{https://footykids-files-storage.storage.yandexcloud.net/news/23%20%D0%B2%D0%BE%D1%81%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D0%B8%D0%BA%D0%B0%20%D0%BD%D0%B0%D1%88%D0%B5%D0%B9%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%88%D0%BA%D0%BE%D0%BB%D1%8B%20%D1%81%D0%BE%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B6%D0%B4%D0%B0%D0%BB%D0%B8%20%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%B5%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%B8%D1%81%D1%82%D0%BE%D0%B2%20%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%20%C2%AB%D0%A3%D1%80%D0%B0%D0%BB%C2%BB%20%D0%B8%20%C2%AB%D0%A6%D0%A1%D0%9A%D0%90%C2%BB%20%D0%BD%D0%B0%20%D0%9A%D1%83%D0%B1%D0%BA%D0%B5%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8%20%D0%BF%D0%BE%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D1%83%210,https://footykids-files-storage.storage.yandexcloud.net/news/23%20%D0%B2%D0%BE%D1%81%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%BD%D0%B8%D0%BA%D0%B0%20%D0%BD%D0%B0%D1%88%D0%B5%D0%B9%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%88%D0%BA%D0%BE%D0%BB%D1%8B%20%D1%81%D0%BE%D0%BF%D1%80%D0%BE%D0%B2%D0%BE%D0%B6%D0%B4%D0%B0%D0%BB%D0%B8%20%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%BB%D0%B5%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D0%B8%D1%81%D1%82%D0%BE%D0%B2%20%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%20%C2%AB%D0%A3%D1%80%D0%B0%D0%BB%C2%BB%20%D0%B8%20%C2%AB%D0%A6%D0%A1%D0%9A%D0%90%C2%BB%20%D0%BD%D0%B0%20%D0%9A%D1%83%D0%B1%D0%BA%D0%B5%20%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8%20%D0%BF%D0%BE%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D1%83%211}	23 воспитанника нашей футбольной школы сопровождали на поле футболистов команд «Урал» и «ЦСКА» на Кубке России по футболу!	dgfdsfg	2023-08-08 21:10:48.517+05	2023-08-08 21:10:48.517+05
2	{https://footykids-files-storage.storage.yandexcloud.net/news/%C2%AB%D0%9C%D0%B5%D1%87%D1%82%D1%8B%20%D0%B4%D0%B5%D1%82%D0%B5%D0%B9%20%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D1%8B%20%D1%81%D0%B1%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F%C2%BB%20-%20%D1%8D%D1%82%D0%BE%20%D1%83%D0%B6%D0%B5%20%D1%82%D0%BE%D1%87%D0%BD%D0%BE%20%D0%B4%D0%B5%D0%B2%D0%B8%D0%B7%20%D0%BD%D0%B0%D1%88%D0%B5%D0%B9%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%88%D0%BA%D0%BE%D0%BB%D1%8B%20%C2%ABFootyKids%C2%BB.0,https://footykids-files-storage.storage.yandexcloud.net/news/%C2%AB%D0%9C%D0%B5%D1%87%D1%82%D1%8B%20%D0%B4%D0%B5%D1%82%D0%B5%D0%B9%20%D0%B4%D0%BE%D0%BB%D0%B6%D0%BD%D1%8B%20%D1%81%D0%B1%D1%8B%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F%C2%BB%20-%20%D1%8D%D1%82%D0%BE%20%D1%83%D0%B6%D0%B5%20%D1%82%D0%BE%D1%87%D0%BD%D0%BE%20%D0%B4%D0%B5%D0%B2%D0%B8%D0%B7%20%D0%BD%D0%B0%D1%88%D0%B5%D0%B9%20%D1%84%D1%83%D1%82%D0%B1%D0%BE%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9%20%D1%88%D0%BA%D0%BE%D0%BB%D1%8B%20%C2%ABFootyKids%C2%BB.1}	«Мечты детей должны сбываться» - это уже точно девиз нашей футбольной школы «FootyKids».	ssd;lfg,esrlt	2023-08-08 21:32:49.298+05	2023-08-08 21:32:49.298+05
\.


--
-- Name: coaches_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.coaches_id_seq', 4, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 2, true);


--
-- Name: coaches coaches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.coaches
    ADD CONSTRAINT coaches_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

