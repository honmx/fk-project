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
-- Name: groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.groups (
    id integer NOT NULL,
    name text,
    "amountOfTrainingsInSubscription" integer,
    "scheduleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.groups OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groups_id_seq OWNER TO postgres;

--
-- Name: groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;


--
-- Name: insurance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.insurance (
    id integer NOT NULL,
    photo text,
    expires text,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.insurance OWNER TO postgres;

--
-- Name: insurance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.insurance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.insurance_id_seq OWNER TO postgres;

--
-- Name: insurance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.insurance_id_seq OWNED BY public.insurance.id;


--
-- Name: medicalDocument; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."medicalDocument" (
    id integer NOT NULL,
    photo text,
    expires text,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."medicalDocument" OWNER TO postgres;

--
-- Name: medicalDocument_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."medicalDocument_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."medicalDocument_id_seq" OWNER TO postgres;

--
-- Name: medicalDocument_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."medicalDocument_id_seq" OWNED BY public."medicalDocument".id;


--
-- Name: personTrainings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."personTrainings" (
    id integer NOT NULL,
    attendance character varying(255),
    "trainingByDayId" integer,
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."personTrainings" OWNER TO postgres;

--
-- Name: personTrainings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."personTrainings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."personTrainings_id_seq" OWNER TO postgres;

--
-- Name: personTrainings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."personTrainings_id_seq" OWNED BY public."personTrainings".id;


--
-- Name: places; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.places (
    id integer NOT NULL,
    name text,
    photo text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.places OWNER TO postgres;

--
-- Name: places_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.places_id_seq OWNER TO postgres;

--
-- Name: places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.places_id_seq OWNED BY public.places.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    value text NOT NULL,
    text text NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: schedule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schedule (
    id integer NOT NULL,
    date text,
    "trainingsByDayId" integer,
    "trainingsByDayOfTheWeekId" integer,
    "userId" integer,
    "groupId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.schedule OWNER TO postgres;

--
-- Name: schedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.schedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.schedule_id_seq OWNER TO postgres;

--
-- Name: schedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.schedule_id_seq OWNED BY public.schedule.id;


--
-- Name: trainingsByDay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."trainingsByDay" (
    id integer NOT NULL,
    date text,
    "time" text,
    "placeId" integer,
    "scheduleId" integer,
    "personTrainingsId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."trainingsByDay" OWNER TO postgres;

--
-- Name: trainingsByDayOfTheWeek; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."trainingsByDayOfTheWeek" (
    id integer NOT NULL,
    "dayOfTheWeek" integer,
    "time" text,
    "placeId" integer,
    "scheduleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."trainingsByDayOfTheWeek" OWNER TO postgres;

--
-- Name: trainingsByDayOfTheWeek_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."trainingsByDayOfTheWeek_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."trainingsByDayOfTheWeek_id_seq" OWNER TO postgres;

--
-- Name: trainingsByDayOfTheWeek_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."trainingsByDayOfTheWeek_id_seq" OWNED BY public."trainingsByDayOfTheWeek".id;


--
-- Name: trainingsByDay_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."trainingsByDay_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."trainingsByDay_id_seq" OWNER TO postgres;

--
-- Name: trainingsByDay_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."trainingsByDay_id_seq" OWNED BY public."trainingsByDay".id;


--
-- Name: userGroups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."userGroups" (
    id integer NOT NULL,
    "userId" integer,
    "groupId" integer
);


ALTER TABLE public."userGroups" OWNER TO postgres;

--
-- Name: userGroups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."userGroups_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."userGroups_id_seq" OWNER TO postgres;

--
-- Name: userGroups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."userGroups_id_seq" OWNED BY public."userGroups".id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    type text,
    email text,
    password text,
    photo text,
    name text,
    "parentName" text,
    birth text,
    "trainingsLeft" integer DEFAULT 0,
    "roleId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);


--
-- Name: insurance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.insurance ALTER COLUMN id SET DEFAULT nextval('public.insurance_id_seq'::regclass);


--
-- Name: medicalDocument id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."medicalDocument" ALTER COLUMN id SET DEFAULT nextval('public."medicalDocument_id_seq"'::regclass);


--
-- Name: personTrainings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personTrainings" ALTER COLUMN id SET DEFAULT nextval('public."personTrainings_id_seq"'::regclass);


--
-- Name: places id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places ALTER COLUMN id SET DEFAULT nextval('public.places_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: schedule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule ALTER COLUMN id SET DEFAULT nextval('public.schedule_id_seq'::regclass);


--
-- Name: trainingsByDay id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDay" ALTER COLUMN id SET DEFAULT nextval('public."trainingsByDay_id_seq"'::regclass);


--
-- Name: trainingsByDayOfTheWeek id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDayOfTheWeek" ALTER COLUMN id SET DEFAULT nextval('public."trainingsByDayOfTheWeek_id_seq"'::regclass);


--
-- Name: userGroups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userGroups" ALTER COLUMN id SET DEFAULT nextval('public."userGroups_id_seq"'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.groups (id, name, "amountOfTrainingsInSubscription", "scheduleId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: insurance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.insurance (id, photo, expires, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: medicalDocument; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."medicalDocument" (id, photo, expires, "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: personTrainings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."personTrainings" (id, attendance, "trainingByDayId", "userId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.places (id, name, photo, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, value, text) FROM stdin;
1	USER	Пользователь
2	ADMIN	Тренер
3	SUPER_ADMIN	Главный тренер
\.


--
-- Data for Name: schedule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schedule (id, date, "trainingsByDayId", "trainingsByDayOfTheWeekId", "userId", "groupId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: trainingsByDay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."trainingsByDay" (id, date, "time", "placeId", "scheduleId", "personTrainingsId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: trainingsByDayOfTheWeek; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."trainingsByDayOfTheWeek" (id, "dayOfTheWeek", "time", "placeId", "scheduleId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: userGroups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."userGroups" (id, "userId", "groupId") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, type, email, password, photo, name, "parentName", birth, "trainingsLeft", "roleId", "createdAt", "updatedAt") FROM stdin;
1	coach	max.klim2004@mail.ru	$2b$05$q0R9RA5inB8jjEgR4aWTQOnSx0Hur9OQ0/Hi5bBXcT2oVmDdM91/e	\N	Клименко Максим Вячеславович	\N	\N	0	3	2025-05-22 16:02:05.303+00	2025-05-22 16:02:05.303+00
\.


--
-- Name: groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.groups_id_seq', 1, false);


--
-- Name: insurance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.insurance_id_seq', 1, false);


--
-- Name: medicalDocument_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."medicalDocument_id_seq"', 1, false);


--
-- Name: personTrainings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."personTrainings_id_seq"', 1, false);


--
-- Name: places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.places_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 1, false);


--
-- Name: schedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.schedule_id_seq', 1, false);


--
-- Name: trainingsByDayOfTheWeek_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."trainingsByDayOfTheWeek_id_seq"', 1, false);


--
-- Name: trainingsByDay_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."trainingsByDay_id_seq"', 1, false);


--
-- Name: userGroups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."userGroups_id_seq"', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: groups groups_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_name_key UNIQUE (name);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);


--
-- Name: insurance insurance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.insurance
    ADD CONSTRAINT insurance_pkey PRIMARY KEY (id);


--
-- Name: medicalDocument medicalDocument_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."medicalDocument"
    ADD CONSTRAINT "medicalDocument_pkey" PRIMARY KEY (id);


--
-- Name: personTrainings personTrainings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personTrainings"
    ADD CONSTRAINT "personTrainings_pkey" PRIMARY KEY (id);


--
-- Name: places places_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: roles roles_text_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_text_key UNIQUE (text);


--
-- Name: roles roles_value_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_value_key UNIQUE (value);


--
-- Name: schedule schedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT schedule_pkey PRIMARY KEY (id);


--
-- Name: trainingsByDayOfTheWeek trainingsByDayOfTheWeek_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDayOfTheWeek"
    ADD CONSTRAINT "trainingsByDayOfTheWeek_pkey" PRIMARY KEY (id);


--
-- Name: trainingsByDay trainingsByDay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDay"
    ADD CONSTRAINT "trainingsByDay_pkey" PRIMARY KEY (id);


--
-- Name: userGroups userGroups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userGroups"
    ADD CONSTRAINT "userGroups_pkey" PRIMARY KEY (id);


--
-- Name: userGroups userGroups_userId_groupId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userGroups"
    ADD CONSTRAINT "userGroups_userId_groupId_key" UNIQUE ("userId", "groupId");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: insurance insurance_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.insurance
    ADD CONSTRAINT "insurance_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: medicalDocument medicalDocument_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."medicalDocument"
    ADD CONSTRAINT "medicalDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: personTrainings personTrainings_trainingByDayId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personTrainings"
    ADD CONSTRAINT "personTrainings_trainingByDayId_fkey" FOREIGN KEY ("trainingByDayId") REFERENCES public."trainingsByDay"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: personTrainings personTrainings_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."personTrainings"
    ADD CONSTRAINT "personTrainings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: schedule schedule_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schedule
    ADD CONSTRAINT "schedule_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: trainingsByDayOfTheWeek trainingsByDayOfTheWeek_placeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDayOfTheWeek"
    ADD CONSTRAINT "trainingsByDayOfTheWeek_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES public.places(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: trainingsByDayOfTheWeek trainingsByDayOfTheWeek_scheduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDayOfTheWeek"
    ADD CONSTRAINT "trainingsByDayOfTheWeek_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public.schedule(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: trainingsByDay trainingsByDay_placeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDay"
    ADD CONSTRAINT "trainingsByDay_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES public.places(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: trainingsByDay trainingsByDay_scheduleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."trainingsByDay"
    ADD CONSTRAINT "trainingsByDay_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES public.schedule(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: userGroups userGroups_groupId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userGroups"
    ADD CONSTRAINT "userGroups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: userGroups userGroups_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userGroups"
    ADD CONSTRAINT "userGroups_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

