const getContacts = (): HTMLElement => {
  const contactsContainer = document.createElement('div');

  contactsContainer.className = 'container-contacts';

  contactsContainer.innerHTML = `
  <div class="contacts" xmlns="http://www.w3.org/1999/html">
    <div class="contacts__item"><div class="icon" id="phone"></div>
      <div class="contacts__text"><a href="tel:+382020000000">+382 020 000 000</a></div>
    </div>
    <div class="contacts__item">
    <div class="icon" id="map"></div>
      <a href="https://goo.gl/maps/Qsc1V7dD275uLDYn8">Podgorica, Studentska bb,
        lamela 11</a>
      </div>
    <div class="contacts__item"><div class="icon" id="clock"></div>
      <div>Working clock: 08:00 -
        17:00
      </div>
    </img>
  </div>`

  return contactsContainer;
}

export default getContacts;
