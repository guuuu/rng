$(document).ready(() => { 
    $("#val").html("Choose amount of entries - " + $("#qtd").val()); 
    $("#rnd_for_txt").html(`Randomize for - ${$("#randomize_for").val()} seconds`); 
    $("#between_txt").html(`Time between randoms - ${$("#between").val()} seconds`);
});

$(document).on("input", "#qtd", () => {
    let entries = $("#qtd").val();
    $("#val").html(`Choose amount of entries - ${entries}`);
    $("#main").empty();

    let size = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--size'));
    let area = size * 2;
    let square_size = parseInt((area / entries) / 2);
    document.documentElement.style.setProperty('--square_width', `${square_size}px`);

    for (let i = 0; i < entries; i++) {
        let s = document.createElement("div");
        $(s).addClass("square");
        $("#main").append(s);
    }
})

$(document).on("input", "#randomize_for", () => { $("#rnd_for_txt").html(`Randomize for - ${$("#randomize_for").val()} seconds`); });
$(document).on("input", "#between", () => { $("#between_txt").html(`Time between randoms - ${$("#between").val()} seconds`); });

$("#pop_winner").click(function() {
    if(!$(this).hasClass("checked"))
        $(this).addClass("checked");
    else
        $(this).removeClass("checked");
})

$("#bt").click(() => {
    let entries = $("#qtd").val();
    let run = true;
    let last = null;
    let flag = false;

    let randomize_for = parseInt($("#randomize_for").val()) * 1000;
    let time_between = parseFloat($("#between").val()) * 1000;
    let pop_winner = $("#pop_winner").hasClass("checked");

    
    if(pop_winner && $("#qtd").val() > 2){
        $("#main").children().each(function(_, el) {
            if($(el).hasClass("winner")){
                $(this).remove();
                $("#qtd").val($("#qtd").val() - 1)
                $("#val").html(`Choose amount of entries - ${$("#qtd").val()}`);
            }
        });
    }

    $(".winner").removeClass("winner");

    let rnd = () => {
        let rng = Math.floor(Math.random() * entries);
        
        if(run){ setTimeout(() => { rnd(); }, time_between); }
        
        if(!flag){
            setTimeout(() => { run = false; }, randomize_for);
            flag = !flag;
        }
        $(".picking").each(function(_, el) { $(el).removeClass("picking"); });
        last = $($(".square")[rng]).addClass("picking");
    }

    rnd();

    setTimeout(() => { 
        $(".picking").each(function(i, el) { $(el).removeClass("picking"); });
        $($(".square")[Math.floor(Math.random() * entries)]).addClass("winner");
    }, randomize_for + 1000)
});

$("#entrie").keypress(function(e) { if(e.keyCode === 13){ addEntrie(String($("#entrie").val())); } })

let addEntrie = (val) => {
    let stop = false;
    $(".square").each((_, el) => {
        if($(el).children().length === 0 && !stop){
            let d = document.createElement("div");
            $(d).html(val)
            $(el).append(d);
            stop = !stop;
        }
    });

    $("#entrie").val("");
}

$("#add_entrie").click(() => { addEntrie(String($("#entrie").val())); })