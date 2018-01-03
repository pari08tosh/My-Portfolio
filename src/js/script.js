function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var buildLines = [
    'web applications.',
    'user interfaces.',
    'progressive web apps.',
    'hybrid apps.',
]

var index = 0;
var char = 0;


$(() => {
    $(".button-collapse").sideNav();
    setTimeout(() => {
        $('.loading-div').fadeOut(300, () => {
            $('.main-content').css("opacity", '1');
            setTimeout(() => {
                build();
            }, 1000);
        });
    }, 2500);

    $("#landing-btn").click(function() {
        $('html, body').animate({
            scrollTop: $(".contact-me").offset().top
        }, 2000);
    });

    $(".learn-div").click(function() {
        $('html, body').animate({
            scrollTop: $(".what-i-do").offset().top
        }, 1000);
    });

    $('.send-btn').click(() => {
        sendMessage();
    });
});

async function build() {
    for (let i = 0; i < buildLines[index].length; i++, char++) {
        $('.build-lines').append(buildLines[index][char]);
        await sleep(90);
    }
    await sleep(1700);
    $('.build-lines').css('background-color', 'rgba(80, 80, 80, .5)');
    await sleep(300);
    $('.build-lines').html("");
    $('.build-lines').css('background-color', 'transparent');
    char = 0;
    index = (index+1)%4;
    build();
} 


function sendMessage() {
    if ((!$("#name").hasClass('valid')) || (!$("#email").hasClass('valid')) || (!$("#number").hasClass('valid')) || (!$("#organization").hasClass('valid')) || (!$("#message").hasClass('valid'))) {
        Materialize.toast('Please fill all the fields correctly', 3000);
        return false;
    }
    Materialize.toast('Sending Message...', 2000);
    let data = {
        name: $("#name").val(),
        message: $("#message").val(),
        organization: $("#organization").val(),
        number: $("#number").val(),
        email: $("#email").val(),
    };
    
    $.post('https://www.paritosh.xyz/messages', data).done((res) => {
       if (res.success) {
        Materialize.toast('Message received. I will get back to you shortly.', 3000);
       } else {
        Materialize.toast('There was an error, please try again.', 3000);
       }
    })
}