$(document).ready(function() {
    $('#submit').on('click', postCurrentAnimal);
    $('body').on('load', returnAllAnimals());
});

function postCurrentAnimal() {
    event.preventDefault();

    var values = {};
    $.each($('#animalForm').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $('#animalForm').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/animals',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                appendAnimal();

            } else {
                console.log('error');
            }
        }
    });

}

function appendAnimal() {
    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function(data) {
            var animalType = data[data.length-1].animal_type;
            var numAnimals = data[data.length-1].number_of_animals;

            $('#display-animals').append('<p>' + animalType + ' | quantity: ' + numAnimals + '</p>');

        }
    })
}

function returnAllAnimals() {
    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function(data) {
            console.log(data);

            data.forEach(function(animal, i) {
                var animalType = animal.animal_type;
                var numAnimals = animal.number_of_animals;

                $('#display-animals').append('<p>' + animalType + ' | quantity: ' + numAnimals + '</p>');

            })

        }
    })
}
