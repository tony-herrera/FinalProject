package com.skilldistillery.doggiemeetup.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MeetupTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Meetup meetup;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("DogMeetUpPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		meetup = em.find(Meetup.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		meetup = null;
	}

	@Test
	@DisplayName("test meetup entity")
	void meetup() {
		assertNotNull(meetup);
		assertEquals("dog and chill", meetup.getTitle());
	}

	@Test
	@DisplayName("test mapping meetup entity to user")
	void meetupToUser() {
		assertNotNull(meetup);
		assertNotNull(meetup.getUser());
		assertEquals("admin@mail.com", meetup.getUser().getEmail());
	}
	@Test
	@DisplayName("test mapping meetup entity to dogpark")
	void meetupToDogPark() {
		assertNotNull(meetup);
		assertNotNull(meetup.getDogPark());
//		assertEquals();
	}
	@Test
	@DisplayName("test mapping meetup entity to dog")
	void meetupToDog() {
		assertNotNull(meetup);
		assertNotNull(meetup.getDogs());
//		assertEquals();
	}

}
