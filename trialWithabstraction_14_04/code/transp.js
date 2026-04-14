function create_transport(name)
{
    var existing = this.patcher.getnamed(name);
    if (existing) {
        return;
    }

    // Передаём @name сразу
    var obj = this.patcher.newdefault(
        100, 100,
        "transport",
        "@name", name
    );

    obj.varname = name;

    //post("Transport created with visible @name and varname: " + name + "\n");
}