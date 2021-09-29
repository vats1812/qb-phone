QB.Phone.Settings = {};
QB.Phone.Settings.Background = "default-qbus";
QB.Phone.Settings.OpenedTab = null;
QB.Phone.Settings.Backgrounds = {
    'default-qbus': {
        label: "Standard Qbus"
    }
};

var PressedBackground = null;
var PressedBackgroundObject = null;
var OldBackground = null;
var IsChecked = null;

$(document).on('click', '.settings-app-tab', function(e) {
    e.preventDefault();
    var PressedTab = $(this).data("settingstab");

    if (PressedTab == "background") {
        QB.Phone.Animations.TopSlideDown(".settings-" + PressedTab + "-tab", 200, 0);
        QB.Phone.Settings.OpenedTab = PressedTab;
        $('.settings-main-app-header').css('display', 'none');
    } else if (PressedTab == "font") {
        QB.Phone.Animations.TopSlideDown(".settings-" + PressedTab + "-tab", 200, 0);
        QB.Phone.Settings.OpenedTab = PressedTab;
        $('.settings-main-app-header').css('display', 'none');
    } else if (PressedTab == "profilepicture") {
        QB.Phone.Animations.TopSlideDown(".settings-" + PressedTab + "-tab", 200, 0);
        QB.Phone.Settings.OpenedTab = PressedTab;
        $('.settings-main-app-header').css('display', 'none');
    } else if (PressedTab == "numberrecognition") {
        var checkBoxes = $(".numberrec-box");
        QB.Phone.Data.AnonymousCall = !checkBoxes.prop("checked");
        checkBoxes.prop("checked", QB.Phone.Data.AnonymousCall);

        if (!QB.Phone.Data.AnonymousCall) {
            $("#numberrecognition > p").html('Off');
        } else {
            $("#numberrecognition > p").html('On');
        }
    }
});

$(document).on('click', '#accept-font', function(e) {
    e.preventDefault();
    var font = $("#font").val();

    if (font == "0") {
        $('.container').css('font-family', "'Courier New', Courier, monospace");
        $('.font-desc').html('<p>Default Font</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Default Font Set!")
    }
    if (font == "1") {
        $('.container').css('font-family', "'Akronim', cursive");
        $('.font-desc').html('<p>Font 1</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 1 Set!")
    }
    if (font == "2") {
        $('.container').css('font-family', "'Arbutus', cursive");
        $('.font-desc').html('<p>Font 2</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 2 Set!")
    }
    if (font == "3") {
        $('.container').css('font-family', "'Are You Serious', cursive");
        $('.font-desc').html('<p>Font 3</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 3 Set!")
    }
    if (font == "4") {
        $('.container').css('font-family', "'Audiowide', cursive");
        $('.font-desc').html('<p>Font 4</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 4 Set!")
    }
    if (font == "5") {
        $('.container').css('font-family', "'Bahiana', cursive");
        $('.font-desc').html('<p>Font 5</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 5 Set!")
    }
    if (font == "6") {
        $('.container').css('font-family', "'Bangers', cursive");
        $('.font-desc').html('<p>Font 6</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 6 Set!")
    }
    if (font == "7") {
        $('.container').css('font-family', "'Barrio', cursive");
        $('.font-desc').html('<p>Font 7</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 7 Set!")
    }
    if (font == "8") {
        $('.container').css('font-family', "'Calligraffitti', cursive");
        $('.font-desc').html('<p>Font 8</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 8 Set!")
    }
    if (font == "9") {
        $('.container').css('font-family', "'Big Shoulders Stencil Text', cursive");
        $('.font-desc').html('<p>Font 9</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 9 Set!")
    }
    if (font == "10") {
        $('.container').css('font-family', "'Bilbo Swash Caps', cursive");
        $('.font-desc').html('<p>Font 10</p>');
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Font 10 Set!")
    }
    anim();
})
$(document).on('click', '#cancel-font', function(e) {
    e.preventDefault();
    QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
    $('.settings-main-app-header').css('display', 'block');
});

function anim() {
    QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
    $('.settings-main-app-header').css('display', 'block');
}

$(document).on('click', '#accept-background', function(e) {
    e.preventDefault();
    var hasCustomBackground = QB.Phone.Functions.IsBackgroundCustom();

    if (hasCustomBackground === false) {
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Default Background is set!")
        QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
        $(".phone-background").css({ "background-image": "url('/html/img/backgrounds/" + QB.Phone.Settings.Background + ".png')" })
        $('.settings-main-app-header').css('display', 'block');
        $('.back-desc').html('<p>Default</p>');
    } else {
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Custom background set!")
        QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
        $(".phone-background").css({ "background-image": "url('" + QB.Phone.Settings.Background + "')" });
        $('.settings-main-app-header').css('display', 'block');
    }

    $.post('https://qb-phone/SetBackground', JSON.stringify({
        background: QB.Phone.Settings.Background,
    }))
});

QB.Phone.Functions.LoadMetaData = function(MetaData) {
    if (MetaData.background !== null && MetaData.background !== undefined) {
        QB.Phone.Settings.Background = MetaData.background;
    } else {
        QB.Phone.Settings.Background = "default-qbus";
    }

    var hasCustomBackground = QB.Phone.Functions.IsBackgroundCustom();

    if (!hasCustomBackground) {
        $(".phone-background").css({ "background-image": "url('/html/img/backgrounds/" + QB.Phone.Settings.Background + ".png')" })
        $('.back-desc').html('<p>Default</p>');
    } else {
        $(".phone-background").css({ "background-image": "url('" + QB.Phone.Settings.Background + "')" });
        $('.back-desc').html('<p>Custom</p>');
    }

    if (MetaData.profilepicture == "default") {
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="https://image.flaticon.com/icons/png/512/3237/3237476.png">');
        $('.prof-desc').html('<p>Default</p>');
    } else {
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="' + MetaData.profilepicture + '">');
        $('.prof-desc').html('<p>Custom</p>');
    }
}

$(document).on('click', '#cancel-background', function(e) {
    e.preventDefault();
    QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
    $('.settings-main-app-header').css('display', 'block');
});


QB.Phone.Functions.IsBackgroundCustom = function() {
    var retval = true;
    $.each(QB.Phone.Settings.Backgrounds, function(i, background) {
        if (QB.Phone.Settings.Background == i) {
            retval = false;
        }
    });
    return retval
}

$(document).on('click', '.background-option', function(e) {
    e.preventDefault();
    PressedBackground = $(this).data('background');
    PressedBackgroundObject = this;
    OldBackground = $(this).parent().find('.background-option-current');
    IsChecked = $(this).find('.background-option-current');

    if (IsChecked.length === 0) {
        if (PressedBackground != "custom-background") {
            QB.Phone.Settings.Background = PressedBackground;
            $(OldBackground).fadeOut(50, function() {
                $(OldBackground).remove();
            });
            $(PressedBackgroundObject).append('<div class="background-option-current"><i class="fas fa-check-circle"></i></div>');
        } else {
            QB.Phone.Animations.TopSlideDown(".background-custom", 200, 13);
        }
    }
});

$(document).on('click', '#accept-custom-background', function(e) {
    e.preventDefault();

    QB.Phone.Settings.Background = $(".custom-background-input").val();
    $(OldBackground).fadeOut(50, function() {
        $(OldBackground).remove();
    });
    $(PressedBackgroundObject).append('<div class="background-option-current"><i class="fas fa-check-circle"></i></div>');
    QB.Phone.Animations.TopSlideUp(".background-custom", 200, -23);
    $('.settings-main-app-header').css('display', 'block');
    $('.back-desc').html('<p>Custom</p>');
});

$(document).on('click', '#cancel-custom-background', function(e) {
    e.preventDefault();

    QB.Phone.Animations.TopSlideUp(".background-custom", 200, -23);
});

// Profile Picture

var PressedProfilePicture = null;
var PressedProfilePictureObject = null;
var OldProfilePicture = null;
var ProfilePictureIsChecked = null;

$(document).on('click', '#accept-profilepicture', function(e) {
    e.preventDefault();
    var ProfilePicture = QB.Phone.Data.MetaData.profilepicture;
    if (ProfilePicture === "default") {
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Default avatar set!")
        QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="https://image.flaticon.com/icons/png/512/3237/3237476.png">');
        $('.settings-main-app-header').css('display', 'block');
        $('.prof-desc').html('<p>Default</p>');
    } else {
        QB.Phone.Notifications.Add("fas fa-user-cog", "Settings", "Custom avatar set!")
        QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
        console.log(ProfilePicture)
        $("[data-settingstab='profilepicture']").find('.settings-tab-icon').html('<img src="' + ProfilePicture + '">');
        $('.settings-main-app-header').css('display', 'block');
        $('.prof-desc').html('<p>Custom</p>');
    }
    $.post('https://qb-phone/UpdateProfilePicture', JSON.stringify({
        profilepicture: ProfilePicture,
    }));
});

$(document).on('click', '#accept-custom-profilepicture', function(e) {
    e.preventDefault();
    QB.Phone.Data.MetaData.profilepicture = $(".custom-profilepicture-input").val();
    $(OldProfilePicture).fadeOut(50, function() {
        $(OldProfilePicture).remove();
    });
    $(PressedProfilePictureObject).append('<div class="profilepicture-option-current"><i class="fas fa-check-circle"></i></div>');
    QB.Phone.Animations.TopSlideUp(".profilepicture-custom", 200, -23);
    $('.settings-main-app-header').css('display', 'block');
});

$(document).on('click', '.profilepicture-option', function(e) {
    e.preventDefault();
    PressedProfilePicture = $(this).data('profilepicture');
    PressedProfilePictureObject = this;
    OldProfilePicture = $(this).parent().find('.profilepicture-option-current');
    ProfilePictureIsChecked = $(this).find('.profilepicture-option-current');
    if (ProfilePictureIsChecked.length === 0) {
        if (PressedProfilePicture != "custom-profilepicture") {
            QB.Phone.Data.MetaData.profilepicture = PressedProfilePicture
            $(OldProfilePicture).fadeOut(50, function() {
                $(OldProfilePicture).remove();
            });
            $(PressedProfilePictureObject).append('<div class="profilepicture-option-current"><i class="fas fa-check-circle"></i></div>');
        } else {
            QB.Phone.Animations.TopSlideDown(".profilepicture-custom", 200, 13);
        }
    }
});

$(document).on('click', '#cancel-profilepicture', function(e) {
    e.preventDefault();
    QB.Phone.Animations.TopSlideUp(".settings-" + QB.Phone.Settings.OpenedTab + "-tab", 200, -100);
    $('.settings-main-app-header').css('display', 'block');
});


$(document).on('click', '#cancel-custom-profilepicture', function(e) {
    e.preventDefault();
    QB.Phone.Animations.TopSlideUp(".profilepicture-custom", 200, -23);
});


// THEME SWITCHER


var mode = document.querySelector(".mode");

function themeChange() {
    var set = document.querySelector("#html").getAttribute("data-theme");

    if (set == "light") {
        document.querySelector("#html").setAttribute("data-theme", "dark");
        mode.innerHTML = 'Dark&nbsp;<img class="mode-img" src="https://cdn-icons-png.flaticon.com/512/3094/3094156.png" alt="night">';
    }
    if (set == "dark") {
        document.querySelector("#html").setAttribute("data-theme", "light");
        mode.innerHTML = 'Light&nbsp;<img class="mode-img" src="https://cdn-icons-png.flaticon.com/512/2698/2698250.png" alt="day">';
    }
}