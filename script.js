// document.addEventListener('DOMContentLoaded', () => {
  const category = document.getElementById('category');
  const result = document.getElementById('result');
  const button = document.getElementById('button');
  const form = document.getElementById('form');
  const loader = document.querySelector('.loader');
  const interface = document.getElementById('interface');

  const fetchCategories = async () => {
    try {
      const fetchData = await fetch('http://ec2-35-181-155-18.eu-west-3.compute.amazonaws.com/get_joke?url=https://api.chucknorris.io/jokes/categories');

      if (!fetchData.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categories = await fetchData.json();
      const categories_options = categories.map(category => `<option value="${category}">${category}</option>`);

      category.innerHTML = categories_options;
    }
    catch (err) {
      displayError(err.message)
    }
  }

  fetchCategories()

  button.addEventListener('click', () => {
    fetchJokes('/random')
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const categoryValue = category.value;

    fetchJokes(`/random?category=${categoryValue}`)
  })

  const fetchJokes = async (endpoint) => {
    try {
      toggleLoader(true)
      const fetchData = await fetch('http://ec2-35-181-155-18.eu-west-3.compute.amazonaws.com/get_joke?url=https://api.chucknorris.io/jokes'+endpoint);

      console.log('fetchData => ', fetchData)
      if (!fetchData.ok) {
        throw new Error('Une erreur est survenue');
      }
      const joke = await fetchData.json();

      console.log('joke => ', joke)
      toggleLoader(false)
      displayJoke(joke.value)
    }
    catch (err) {
      displayError(err.message)
    }
    finally {
      toggleLoader(false)
    }
  }

  const displayJoke = (joke) => {
    result.innerHTML = `<p class="box has-text-white has-text-weight-bold">${joke}</p>`;
  }

  const displayError = (err) => {
    result.innerHTML = `<p class="box has-text-danger has-text-weight-bold">Une erreur est survenue: ${err.message}</p>`;
  }

  const toggleLoader = (isLoading) => {
    loader.style.display = isLoading ? 'block' : 'none'
    interface.style.display = isLoading ? 'none' : 'block'
  }
// });


  